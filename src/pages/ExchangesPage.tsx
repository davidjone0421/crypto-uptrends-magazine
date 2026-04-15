import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PriceTicker } from "@/components/PriceTicker";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { SEO } from "@/components/SEO";
import { ExternalLink } from "lucide-react";

const exchanges = [
  { name: "Binance", desc: "World's largest crypto exchange by trading volume with 350+ coins.", url: "https://www.binance.com", color: "bg-yellow-500" },
  { name: "Coinbase", desc: "Most trusted US-regulated exchange, beginner-friendly with strong security.", url: "https://www.coinbase.com", color: "bg-blue-500" },
  { name: "Kraken", desc: "Established exchange known for advanced trading features and low fees.", url: "https://www.kraken.com", color: "bg-purple-500" },
  { name: "Bybit", desc: "Leading derivatives exchange offering up to 100x leverage on crypto futures.", url: "https://www.bybit.com", color: "bg-orange-500" },
];

export default function ExchangesPage() {
  const { prices, loading } = useCryptoPrices(20);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Top Crypto Exchanges" description="Compare leading cryptocurrency exchanges — Binance, Coinbase, Kraken, and Bybit." url="/exchanges" />
      <PriceTicker prices={prices} loading={loading} />
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">Top Crypto Exchanges</h1>
        <p className="text-muted-foreground mb-10">Compare the leading cryptocurrency exchanges to find the best fit for your trading needs.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {exchanges.map((ex) => (
            <div key={ex.name} className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 ${ex.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                  {ex.name[0]}
                </div>
                <h3 className="text-lg font-semibold">{ex.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{ex.desc}</p>
              <a href={ex.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                Visit Exchange <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
