import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PriceTicker } from "@/components/PriceTicker";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { SEO } from "@/components/SEO";
import { TrendingUp, Users, Globe, Shield } from "lucide-react";

export default function AboutPage() {
  const { prices, loading } = useCryptoPrices(20);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="About Us" description="Learn about Crypto UpTrends — your trusted source for cryptocurrency news and market insights." url="/about" />
      <PriceTicker prices={prices} loading={loading} />
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">About Crypto UpTrends</h1>
        <p className="text-muted-foreground mb-8">Your trusted source for cryptocurrency news and market insights since 2024.</p>

        <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
          <p className="text-base leading-relaxed">Crypto UpTrends is a leading digital media platform dedicated to delivering timely, accurate, and insightful coverage of the rapidly evolving cryptocurrency and blockchain landscape. Our team of experienced analysts and journalists works around the clock to bring you breaking news, in-depth market analysis, and expert commentary.</p>
          <p className="text-base leading-relaxed mt-4">Founded with the mission to make crypto accessible to everyone, we bridge the gap between complex blockchain technology and everyday investors. Whether you're a seasoned trader or just starting your crypto journey, Crypto UpTrends is your go-to resource.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: TrendingUp, title: "Real-Time Data", desc: "Live prices and market updates 24/7" },
            { icon: Users, title: "Expert Team", desc: "Seasoned analysts and crypto journalists" },
            { icon: Globe, title: "Global Coverage", desc: "News from every corner of the crypto world" },
            { icon: Shield, title: "Trusted Source", desc: "Verified information you can rely on" },
          ].map((item) => (
            <div key={item.title} className="bg-card border rounded-xl p-5 text-center">
              <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
