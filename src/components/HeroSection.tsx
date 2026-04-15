import type { NewsArticle } from "@/types/crypto";
import { Clock } from "lucide-react";

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

export function HeroSection({ articles, loading }: Props) {
  if (loading) {
    return (
      <section className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[500px]">
          <div className="lg:col-span-2 bg-muted animate-pulse rounded-xl" />
          <div className="flex flex-col gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-1 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featured = articles[0];
  const side = articles.slice(1, 4);

  return (
    <section className="container mx-auto px-4 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Featured */}
        {featured && (
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:col-span-2 relative rounded-xl overflow-hidden group min-h-[320px] lg:min-h-[420px] flex items-end"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${featured.image_url || "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80"})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative p-6 lg:p-8 text-white">
              <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-primary rounded-md mb-3">
                {featured.category}
              </span>
              <h1 className="text-2xl lg:text-3xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
                {featured.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <span>{featured.source}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {timeAgo(featured.published_at)}
                </span>
              </div>
            </div>
          </a>
        )}

        {/* Side Cards */}
        <div className="flex flex-col gap-4">
          {side.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-xl overflow-hidden group flex-1 min-h-[120px] flex items-end"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${article.image_url || "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80"})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative p-4 text-white">
                <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <span className="text-xs text-white/60 mt-1 block">{article.source}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
