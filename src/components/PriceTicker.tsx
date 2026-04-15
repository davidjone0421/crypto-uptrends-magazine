import { TrendingUp, TrendingDown } from "lucide-react";
import type { CryptoPrice } from "@/types/crypto";

interface Props {
  prices: CryptoPrice[];
  loading: boolean;
}

export function PriceTicker({ prices, loading }: Props) {
  if (loading || prices.length === 0) {
    return (
      <div className="bg-ticker text-ticker py-2 text-sm overflow-hidden">
        <div className="flex items-center justify-center gap-2 animate-pulse">
          Loading live prices...
        </div>
      </div>
    );
  }

  const tickerItems = [...prices, ...prices]; // duplicate for seamless loop

  return (
    <div className="bg-ticker text-ticker py-2 text-xs overflow-hidden">
      <div className="flex items-center gap-8 animate-ticker whitespace-nowrap" style={{ width: "max-content" }}>
        {tickerItems.map((coin, i) => (
          <div key={`${coin.id}-${i}`} className="flex items-center gap-1.5">
            <img src={coin.image} alt={coin.symbol} className="w-4 h-4 rounded-full" />
            <span className="font-heading font-semibold uppercase">{coin.symbol}</span>
            <span className="font-medium">${coin.current_price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            <span className={`flex items-center gap-0.5 ${coin.price_change_percentage_24h >= 0 ? "text-gain" : "text-loss"}`}>
              {coin.price_change_percentage_24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
