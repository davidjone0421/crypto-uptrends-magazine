import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, UserPlus, Shield, Pencil } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface Member {
  user_id: string;
  email: string;
  role: "admin" | "editor" | "user";
  created_at: string;
}

type Role = "admin" | "editor" | "user";

export function TeamMembersView() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("editor");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("list-team-members", { body: {} });
    if (error) {
      toast.error("Failed to load team: " + error.message);
    } else {
      setMembers(data?.members ?? []);
    }
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  const setRole = async (user_id: string, role: Role) => {
    setBusy(user_id);
    const { error } = await supabase.functions.invoke("list-team-members", {
      body: { action: "set_role", target_user_id: user_id, role },
    });
    setBusy(null);
    if (error) return toast.error("Update failed: " + error.message);
    toast.success("Role updated.");
    void load();
  };

  const removeMember = async (user_id: string) => {
    setBusy(user_id);
    const { error } = await supabase.functions.invoke("list-team-members", {
      body: { action: "set_role", target_user_id: user_id, role: "user" },
    });
    setBusy(null);
    if (error) return toast.error("Remove failed: " + error.message);
    toast.success("Demoted to regular user.");
    void load();
  };

  const invite = async () => {
    if (!inviteEmail) return toast.error("Enter an email.");
    setBusy("invite");
    const { error } = await supabase.functions.invoke("list-team-members", {
      body: { action: "invite", email: inviteEmail, role: inviteRole },
    });
    setBusy(null);
    if (error) return toast.error("Invite failed: " + error.message);
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail("");
    void load();
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Team Members</h1>
      </div>

      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Invite team member
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="email@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1"
          />
          <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as Role)}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={invite} disabled={busy === "invite"}>
            {busy === "invite" ? "Sending..." : "Send Invite"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          They'll receive an email to set their password and join with the selected role.
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-muted-foreground">Loading members...</p>
        ) : members.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No team members yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left px-4 py-3 font-semibold">Email</th>
                  <th className="text-left px-4 py-3 font-semibold w-40">Role</th>
                  <th className="text-left px-4 py-3 font-semibold w-32">Joined</th>
                  <th className="text-right px-4 py-3 font-semibold w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.user_id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{m.email}</td>
                    <td className="px-4 py-3">
                      <Select
                        value={m.role}
                        onValueChange={(v) => setRole(m.user_id, v as Role)}
                        disabled={busy === m.user_id}
                      >
                        <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {new Date(m.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => removeMember(m.user_id)}
                        disabled={busy === m.user_id || m.role === "user"}
                        title="Demote to regular user"
                        className="p-1.5 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed inline-flex"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
