import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { useCryptoNews } from "@/hooks/useCryptoNews";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { PriceTicker } from "@/components/PriceTicker";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/AdBanner";

const categoryMap: Record<string, string> = {
  "crypto-news": "Crypto News",
  "bitcoin-news": "Bitcoin",
  "ai-web3": "Web3",
  "altcoin-updates": "Altcoins",
  "price-predictions": "Market Analysis",
};

const filters = ["All", "Latest", "Bullish", "Bearish"];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const [activeFilter, setActiveFilter] = useState("All");
  const { articles, loading } = useCryptoNews();
  const { prices, loading: pricesLoading } = useCryptoPrices(20);

  const categoryLabel = categoryMap[name || ""] || "Crypto News";

  // Filter articles by category (loose match for demo)
  let filtered = name === "crypto-news"
    ? articles
    : articles.filter((a) =>
        a.category.toLowerCase().includes(categoryLabel.toLowerCase()) ||
        a.title.toLowerCase().includes(categoryLabel.toLowerCase().split(" ")[0])
      );

  // If too few, show all
  if (filtered.length < 4) filtered = articles;

  // Apply sentiment filter (mock)
  if (activeFilter === "Latest") filtered = [...filtered].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  if (activeFilter === "Bullish") filtered = filtered.filter((_, i) => i % 2 === 0);
  if (activeFilter === "Bearish") filtered = filtered.filter((_, i) => i % 2 === 1);

  return (
    <div className="min-h-screen bg-background">
      <PriceTicker prices={prices} loading={pricesLoading} />
      <Header />

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-2">{categoryLabel}</h1>
        <p className="text-sm text-muted-foreground mb-6">Browse the latest {categoryLabel.toLowerCase()} articles and updates.</p>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Ad */}
        <div className="flex justify-center mb-8">
          <AdBanner width={728} height={90} />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="bg-card rounded-xl overflow-hidden border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <img
                  src={article.image_url || "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=600&q=80"}
                  alt={article.title}
                  className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
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
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
