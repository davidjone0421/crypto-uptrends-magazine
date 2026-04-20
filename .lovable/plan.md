
The user wants to expand the role system beyond just admin/user. Looking at the current setup:

- `app_role` enum currently has: `admin`, `user` (likely — based on `handle_new_user` function)
- RLS policies on `articles` only check for `admin`
- Only admins can create/edit/delete posts right now
- User wants an "editor" team that can also log in and manage posts

Need to clarify: should editors have the same powers as admins (full CRUD on articles), or limited (e.g., create + edit own, but not delete)? And should admins manage who is an editor?

Let me present a clean plan covering the most likely interpretation, then they can adjust.

## Plan

### 1. Add `editor` role to the system

**Database migration:**
- Add `'editor'` value to the `app_role` enum
- Update RLS policies on `articles` so both admins AND editors can INSERT, UPDATE, DELETE:
  - Replace `has_role(auth.uid(), 'admin')` with `has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'editor')`
- Keep `user_roles` management restricted to **admins only** (editors cannot promote others)

### 2. Admin-only "User Management" view

Add a new sidebar tab in `AdminDashboard` called **"Team Members"** (visible only to admins):
- Lists all users from `user_roles` with their email + current role
- Admin can change a user's role between `user`, `editor`, `admin`
- Admin can remove a role
- Uses the existing `user_roles` table (already has admin-manage-all RLS policy)

Note: Listing emails requires reading from `auth.users`. Will create a small **edge function** `list-team-members` (admin-gated) that returns `{user_id, email, role}` since `auth.users` isn't directly queryable from the client.

### 3. Update `AuthContext`

- Add `isEditor` boolean alongside `isAdmin`
- Add a derived `canManageContent = isAdmin || isEditor`

### 4. Update `AdminDashboard` access guard

- Allow both admins AND editors to access the dashboard
- Editors see: Dashboard Overview, Create Post, Manage Posts
- Admins additionally see: Team Members tab
- Non-admin/non-editor users get the "Access Denied" screen

### 5. Update `ManagePostsView` and `CreatePostView`

- Replace `isAdmin` gating with `canManageContent` so editors can also create/edit/delete

### 6. Files touched

- **New migration**: add editor enum value + update articles RLS policies
- **New edge function**: `supabase/functions/list-team-members/index.ts`
- **New component**: `src/components/admin/TeamMembersView.tsx`
- `src/contexts/AuthContext.tsx` — add `isEditor` + `canManageContent`
- `src/pages/AdminDashboard.tsx` — new tab, updated guards
- `src/components/admin/ManagePostsView.tsx` — use `canManageContent`

### Open question
Should editors have **full** CRUD (create/edit/delete any post) like admins, or **limited** (create + edit/delete only their own posts)? The plan above assumes full CRUD — simpler and matches "control should also create/edit/delete post". If you want the limited version, I'll adjust the RLS to check `author_id = auth.uid()` for editor updates/deletes.
