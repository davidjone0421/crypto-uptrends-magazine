import { useState } from "react";
import { Pencil, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ImageUploader } from "@/components/ImageUploader";
import type { NewsArticle } from "@/types/crypto";

const categories = ["Bitcoin", "Altcoins", "Web3", "Market Analysis", "General"];

interface Props {
  articles: NewsArticle[];
  loading: boolean;
  isAdmin: boolean;
  onUpdate: (id: string, patch: any) => Promise<any>;
  onDelete: (id: string) => Promise<void>;
}

export function ManagePostsView({ articles, loading, isAdmin, onUpdate, onDelete }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<{
    title: string; excerpt: string; category: string; content: string; feature_image: string;
  }>({ title: "", excerpt: "", category: "", content: "", feature_image: "" });
  const [busyId, setBusyId] = useState<string | null>(null);

  const startEdit = (a: NewsArticle) => {
    setEditingId(a.id);
    setDraft({
      title: a.title,
      excerpt: a.description || "",
      category: a.category || "General",
      content: a.body || "",
      feature_image: a.image_url || "",
    });
  };

  const cancelEdit = () => { setEditingId(null); };

  const saveEdit = async (id: string) => {
    if (!draft.title || !draft.category) {
      toast.error("Title and Category are required.");
      return;
    }
    setBusyId(id);
    try {
      await onUpdate(id, draft);
      toast.success("Article updated.");
      setEditingId(null);
    } catch (err: any) {
      toast.error("Update failed: " + (err.message || "Unknown error"));
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setBusyId(id);
    try {
      await onDelete(id);
      toast.success("Article deleted.");
    } catch (err: any) {
      toast.error("Delete failed: " + (err.message || "Unknown error"));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Posts</h1>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading articles...</p>
      ) : articles.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">No articles yet. Create your first post from the "Create Post" tab.</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left px-4 py-3 font-semibold w-20">Image</th>
                  <th className="text-left px-4 py-3 font-semibold">Title</th>
                  <th className="text-left px-4 py-3 font-semibold w-40">Category</th>
                  <th className="text-left px-4 py-3 font-semibold w-32">Date</th>
                  <th className="text-right px-4 py-3 font-semibold w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((a) => (
                  <tr key={a.id} className="border-b border-border hover:bg-secondary/30 transition-colors align-top">
                    <td className="px-4 py-3">
                      <img
                        src={a.image_url || "/placeholder.svg"}
                        alt=""
                        className="w-14 h-10 rounded object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 max-w-md">
                      <span className="line-clamp-2 font-medium">{a.title}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{a.category}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                      {new Date(a.published_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(a)}
                          disabled={!isAdmin || busyId === a.id}
                          title="Edit"
                          className="p-1.5 rounded-md bg-secondary text-foreground hover:bg-secondary/70 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              disabled={!isAdmin || busyId === a.id}
                              title="Delete"
                              className="p-1.5 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete this article?</AlertDialogTitle>
                              <AlertDialogDescription>
                                "{a.title}" will be permanently removed. This cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(a.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit dialog (inline panel) */}
      {editingId && (
        <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-auto">
          <div className="bg-card rounded-xl border border-border max-w-2xl w-full p-6 my-8 max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">Edit Article</h2>
              <button onClick={cancelEdit} className="p-1.5 rounded-md hover:bg-secondary transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Excerpt</label>
                <Input value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category *</label>
                <Select value={draft.category} onValueChange={(v) => setDraft({ ...draft, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Feature Image</label>
                <ImageUploader value={draft.feature_image} onChange={(v) => setDraft({ ...draft, feature_image: v })} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea rows={8} value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={cancelEdit}>Cancel</Button>
                <Button onClick={() => saveEdit(editingId)} disabled={busyId === editingId}>
                  <Save className="w-4 h-4 mr-2" />
                  {busyId === editingId ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
