import type { NewsArticle } from "@/types/crypto";
import type { CryptoPrice } from "@/types/crypto";
import { TrendingUp, TrendingDown, Flame } from "lucide-react";

interface TrendingProps {
  articles: NewsArticle[];
}

interface MarketProps {
  prices: CryptoPrice[];
  loading: boolean;
}

export function TrendingSidebar({ articles }: TrendingProps) {
  return (
    <div className="bg-card rounded-xl border p-5">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Flame className="w-5 h-5 text-primary" />
        Trending
      </h3>
      <div className="space-y-3">
        {articles.slice(0, 6).map((article, i) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 group"
          >
            <span className="text-2xl font-heading font-bold text-primary/30 leading-none mt-0.5 w-7 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h4 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h4>
              <span className="text-xs text-muted-foreground">{article.source}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function MarketOverview({ prices, loading }: MarketProps) {
  if (loading) {
    return (
      <div className="bg-card rounded-xl border p-5 mt-5">
        <h3 className="text-lg font-bold mb-4">Market Overview</h3>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-muted rounded animate-pulse mb-2" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border p-5 mt-5">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Market Overview
      </h3>
      <div className="space-y-1">
        {prices.slice(0, 5).map((coin) => (
          <div
            key={coin.id}
            className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0"
          >
            <div className="flex items-center gap-2.5">
              <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
              <div>
                <span className="text-sm font-semibold">{coin.symbol.toUpperCase()}</span>
                <span className="text-xs text-muted-foreground ml-1.5 hidden sm:inline">{coin.name}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">
                ${coin.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div className={`text-xs flex items-center justify-end gap-0.5 ${coin.price_change_percentage_24h >= 0 ? "text-gain" : "text-loss"}`}>
                {coin.price_change_percentage_24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
