import { useParams, Link } from "react-router-dom";
import { Clock, ArrowLeft, User } from "lucide-react";
import { useCryptoNews } from "@/hooks/useCryptoNews";
import { AdBanner } from "@/components/AdBanner";
import { PriceTicker } from "@/components/PriceTicker";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const { articles, loading } = useCryptoNews();
  const { prices, loading: pricesLoading } = useCryptoPrices(20);

  const article = articles.find((a) => a.id === id);
  const trending = articles.filter((a) => a.id !== id).slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <PriceTicker prices={prices} loading={pricesLoading} />
        <Header />
        <div className="container mx-auto px-4 lg:px-8 py-10">
          <div className="h-96 bg-muted animate-pulse rounded-xl" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <PriceTicker prices={prices} loading={pricesLoading} />
        <Header />
        <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const featureImage = article.image_url || "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&q=80";
  const bodyText = article.body || article.description || `${article.title}. This article covers the latest developments in cryptocurrency markets and blockchain technology. Stay informed with real-time coverage of digital asset markets, regulatory updates, and technological advancements shaping the future of finance.\n\nThe cryptocurrency market continues to evolve rapidly, with new developments emerging daily across multiple sectors including DeFi, NFTs, and institutional adoption. Market participants are closely watching regulatory developments across major economies, which could significantly impact the trajectory of digital assets.\n\nAnalysts suggest that the current market conditions present both opportunities and challenges for investors, with technical indicators pointing to potential volatility in the near term. Meanwhile, blockchain infrastructure continues to mature, with several major networks announcing significant upgrades aimed at improving scalability and reducing transaction costs.`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={article.title}
        description={article.description || article.title}
        image={featureImage}
        url={`/article/${id}`}
        type="article"
      />
      <PriceTicker prices={prices} loading={pricesLoading} />
      <Header />

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Main Content */}
          <article>
            {/* Feature Image */}
            <div className="rounded-xl overflow-hidden mb-6">
              <img
                src={featureImage}
                alt={article.title}
                className="w-full h-64 sm:h-80 lg:h-[420px] object-cover"
              />
            </div>

            <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-md mb-3">
              {article.category}
            </span>
            <h1 className="text-2xl lg:text-3xl font-bold leading-tight mb-4">{article.title}</h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.author || article.source}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {timeAgo(article.published_at)}
              </span>
            </div>

            {/* Ad inside content */}
            <div className="flex justify-center my-6">
              <AdBanner width={728} height={90} />
            </div>

            <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line">
              {bodyText}
            </div>

            <div className="flex justify-center my-8">
              <AdBanner width={728} height={90} />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <AdBanner width={300} height={250} />

            <div className="bg-card rounded-xl border p-5">
              <h3 className="text-lg font-bold mb-4">Trending News</h3>
              <div className="space-y-3">
                {trending.map((a, i) => (
                  <Link
                    key={a.id}
                    to={`/article/${a.id}`}
                    className="flex items-start gap-3 group"
                  >
                    <img
                      src={a.image_url || `https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&q=80`}
                      alt={a.title}
                      className="w-16 h-12 rounded object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {a.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">{a.source}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
