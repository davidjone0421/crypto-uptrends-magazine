import type { NewsArticle } from "@/types/crypto";
import { Clock, Star } from "lucide-react";

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

export function EditorsPicks({ articles, loading }: Props) {
  if (loading) {
    return (
      <section className="container mx-auto px-4 lg:px-8 py-10">
        <h2 className="text-xl font-bold mb-6">Editor's Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 lg:px-8 py-10">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Star className="w-5 h-5 text-primary" />
        Editor's Picks
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card rounded-xl overflow-hidden border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          >
            <div
              className="h-40 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${article.image_url || "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&q=80"})` }}
            />
            <div className="p-4">
              <span className="text-xs font-medium text-primary">{article.category}</span>
              <h3 className="text-sm font-semibold leading-snug mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <span>{article.source}</span>
                <span>·</span>
                <span className="flex items-center gap-0.5">
                  <Clock className="w-3 h-3" />
                  {timeAgo(article.published_at)}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
