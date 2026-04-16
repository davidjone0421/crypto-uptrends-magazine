import { PriceTicker } from "@/components/PriceTicker";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LatestNews } from "@/components/LatestNews";
import { TrendingSidebar, MarketOverview } from "@/components/Sidebar";
import { EditorsPicks } from "@/components/EditorsPicks";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/AdBanner";
import { SEO } from "@/components/SEO";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { useSupabaseArticles } from "@/hooks/useSupabaseArticles";

const Index = () => {
  const { prices, loading: pricesLoading } = useCryptoPrices(20);
  const { articles, loading: newsLoading } = useSupabaseArticles();

  const heroArticles = articles.slice(0, 4);
  const latestArticles = articles.slice(4, 12);
  const trendingArticles = [...articles].sort(() => 0.5 - Math.random()).slice(0, 6);
  const editorPicks = articles.slice(8, 12).length >= 4 ? articles.slice(8, 12) : articles.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SEO />
      <PriceTicker prices={prices} loading={pricesLoading} />
      <Header />
      <HeroSection articles={heroArticles} loading={newsLoading} />
      <section className="container mx-auto px-4 lg:px-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <LatestNews articles={latestArticles} loading={newsLoading} />
          <aside className="space-y-5">
            <AdBanner width={300} height={250} />
            <TrendingSidebar articles={trendingArticles} />
            <MarketOverview prices={prices} loading={pricesLoading} />
          </aside>
        </div>
      </section>
      <EditorsPicks articles={editorPicks} loading={newsLoading} />
      <Footer />
    </div>
  );
};

export default Index;
