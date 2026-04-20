import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON_KEY = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify caller is admin via their JWT
    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: isAdmin } = await userClient.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden — admin only" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action, target_user_id, role, email } =
      req.method === "POST" ? await req.json().catch(() => ({})) : {};

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);

    if (action === "set_role") {
      if (!target_user_id || !["admin", "editor", "user"].includes(role)) {
        return new Response(JSON.stringify({ error: "Invalid params" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Replace any existing role rows for that user with the new single role
      await admin.from("user_roles").delete().eq("user_id", target_user_id);
      const { error: insErr } = await admin.from("user_roles").insert({ user_id: target_user_id, role });
      if (insErr) throw insErr;
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "invite") {
      if (!email || !["admin", "editor", "user"].includes(role)) {
        return new Response(JSON.stringify({ error: "Invalid params" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { data: invited, error: invErr } = await admin.auth.admin.inviteUserByEmail(email);
      if (invErr) throw invErr;
      const newId = invited.user?.id;
      if (newId) {
        await admin.from("user_roles").delete().eq("user_id", newId);
        await admin.from("user_roles").insert({ user_id: newId, role });
      }
      return new Response(JSON.stringify({ ok: true, user_id: newId }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Default: list all team members
    const { data: roles, error: rolesErr } = await admin
      .from("user_roles")
      .select("user_id, role, created_at")
      .order("created_at", { ascending: false });
    if (rolesErr) throw rolesErr;

    const { data: usersList, error: listErr } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });
    if (listErr) throw listErr;

    const emailById = new Map(usersList.users.map((u) => [u.id, u.email ?? ""]));
    const members = (roles ?? []).map((r) => ({
      user_id: r.user_id,
      role: r.role,
      email: emailById.get(r.user_id) ?? "(unknown)",
      created_at: r.created_at,
    }));

    return new Response(JSON.stringify({ members }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
