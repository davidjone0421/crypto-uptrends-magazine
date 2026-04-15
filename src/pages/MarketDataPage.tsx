import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PriceTicker } from "@/components/PriceTicker";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function MarketDataPage() {
  const { prices, loading } = useCryptoPrices(20);

  const fmt = (n: number) =>
    n >= 1e9 ? `$${(n / 1e9).toFixed(2)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : `$${n.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-background">
      <PriceTicker prices={prices} loading={loading} />
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2">Market Data</h1>
        <p className="text-muted-foreground mb-8">Top 20 cryptocurrencies by market capitalization. Data from CoinGecko.</p>

        <div className="bg-card border rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-muted-foreground">Loading market data...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Coin</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">24h Change</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">Market Cap</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prices.map((coin) => (
                  <TableRow key={coin.id}>
                    <TableCell className="font-medium text-muted-foreground">{coin.market_cap_rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                        <span className="font-medium text-sm">{coin.name}</span>
                        <span className="text-xs text-muted-foreground uppercase">{coin.symbol}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium text-sm">${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-flex items-center gap-0.5 text-sm font-medium ${coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {coin.price_change_percentage_24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground hidden sm:table-cell">{fmt(coin.market_cap)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
