import type { NewsArticle } from "@/types/crypto";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  articles: NewsArticle[];
  loading: boolean;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function LatestNews({ articles, loading }: Props) {
  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Latest News</h2>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="w-28 h-20 bg-muted rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
        <span className="w-1 h-6 bg-primary rounded-full" />
        Latest News
      </h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="flex gap-4 p-3 rounded-xl bg-card hover:bg-secondary/50 border border-transparent hover:border-border transition-all group"
          >
            <img
              src={article.image_url || "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&q=80"}
              alt={article.title}
              className="w-28 h-20 rounded-lg object-cover shrink-0 transition-transform group-hover:scale-[1.03]"
            />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-medium text-primary">{article.category}</span>
              <h3 className="text-sm font-semibold leading-snug mt-0.5 line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5">
                <span>{article.source}</span>
                <span>·</span>
                <span className="flex items-center gap-0.5">
                  <Clock className="w-3 h-3" />
                  {timeAgo(article.published_at)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
