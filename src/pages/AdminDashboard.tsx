
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  LayoutDashboard, FilePlus, FileCheck, LogOut, TrendingUp,
  FileText, Eye, Clock, Check, X, Users,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCryptoNews } from "@/hooks/useCryptoNews";
import { useLocalArticles } from "@/hooks/useLocalArticles";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type View = "dashboard" | "create" | "approvals";

export default function AdminDashboard() {
  const { isAuthenticated, user, logout } = useAuth();
  const [view, setView] = useState<View>("dashboard");
  const { articles } = useCryptoNews();
  const { addArticle } = useLocalArticles();
  const navigate = useNavigate();
  const [approvalStatus, setApprovalStatus] = useState<Record<string, "approved" | "rejected">>({});

  if (!isAuthenticated) return <Navigate to="/admin-login" replace />;

  const sidebarItems: { label: string; icon: typeof LayoutDashboard; view: View }[] = [
    { label: "Dashboard Overview", icon: LayoutDashboard, view: "dashboard" },
    { label: "Create Post", icon: FilePlus, view: "create" },
    { label: "Pending Approvals", icon: FileCheck, view: "approvals" },
  ];

  const pendingArticles = articles.slice(0, 8);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            <span className="font-heading text-lg font-bold">
              Crypto <span className="text-primary">UpTrends</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                view === item.view
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <div className="text-xs text-muted-foreground mb-2 px-3">
            {user?.name} ({user?.role})
          </div>
          <button
            onClick={() => { logout(); navigate("/admin-login"); }}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        {view === "dashboard" && <DashboardView articleCount={articles.length} />}
        {view === "create" && <CreatePostView onPublish={addArticle} />}
        {view === "approvals" && (
          <ApprovalsView
            articles={pendingArticles}
            status={approvalStatus}
            onAction={(id, action) => setApprovalStatus((prev) => ({ ...prev, [id]: action }))}
          />
        )}
      </main>
    </div>
  );
}

/* ──── Dashboard Overview ──── */
function DashboardView({ articleCount }: { articleCount: number }) {
  const stats = [
    { label: "Total Articles", value: articleCount, icon: FileText, color: "text-primary" },
    { label: "Pending Drafts", value: 8, icon: Clock, color: "text-amber-500" },
    { label: "Total Views", value: "24.5K", icon: Eye, color: "text-emerald-500" },
    { label: "Active Users", value: "1.2K", icon: Users, color: "text-sky-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className="text-3xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──── Create Post ──── */
const categories = ["Bitcoin", "Altcoins", "Web3", "Market Analysis"];

function CreatePostView({ onPublish }: { onPublish: (a: any) => void }) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category) {
      toast.error("Title and Category are required.");
      return;
    }
    onPublish({
      title,
      description: excerpt || title,
      category,
      body: content,
      image_url: imageUrl || "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
      source: "Crypto UpTrends",
      author: "Admin",
    });
    toast.success("Article published successfully!");
    setTitle(""); setExcerpt(""); setCategory(""); setContent(""); setImageUrl("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 max-w-2xl space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title *</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter article title" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Excerpt</label>
          <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short description" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Category *</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Feature Image URL</label>
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://images.unsplash.com/..." />
          {imageUrl && (
            <img src={imageUrl} alt="Preview" className="mt-2 h-40 w-full object-cover rounded-lg border border-border" />
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write article content..." rows={8} />
        </div>
        <Button type="submit" className="w-full sm:w-auto">
          <FilePlus className="w-4 h-4 mr-2" /> Publish Article
        </Button>
      </form>
    </div>
  );
}

/* ──── Approvals ──── */
function ApprovalsView({
  articles,
  status,
  onAction,
}: {
  articles: any[];
  status: Record<string, "approved" | "rejected">;
  onAction: (id: string, action: "approved" | "rejected") => void;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pending Approvals</h1>
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 font-semibold">Image</th>
                <th className="text-left px-4 py-3 font-semibold">Title</th>
                <th className="text-left px-4 py-3 font-semibold">Source</th>
                <th className="text-left px-4 py-3 font-semibold">Date</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-left px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <img
                      src={a.image_url || "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&q=60"}
                      alt="" className="w-12 h-9 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 max-w-xs"><span className="line-clamp-1 font-medium">{a.title}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{a.source}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(a.published_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    {status[a.id] ? (
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        status[a.id] === "approved"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}>{status[a.id] === "approved" ? "Approved" : "Rejected"}</span>
                    ) : (
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {!status[a.id] && (
                      <div className="flex items-center gap-2">
                        <button onClick={() => onAction(a.id, "approved")} className="p-1.5 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 transition-colors">
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => onAction(a.id, "rejected")} className="p-1.5 rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 transition-colors">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
