import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PriceTicker } from "@/components/PriceTicker";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { SEO } from "@/components/SEO";
import { Rocket, Bell } from "lucide-react";
import { useState } from "react";

export default function PortfolioTrackerPage() {
  const { prices, loading } = useCryptoPrices(20);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Portfolio Tracker" description="Track your crypto holdings with real-time P&L, alerts, and performance analytics — coming soon." url="/portfolio-tracker" />
      <PriceTicker prices={prices} loading={loading} />
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-20 max-w-2xl text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Rocket className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Portfolio Tracker</h1>
          <p className="text-lg text-muted-foreground mb-2">Our Advanced Portfolio Tracker is launching soon.</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">Track all your crypto holdings in one place with real-time P&L, alerts, and performance analytics. Be the first to know when we launch.</p>
        </div>

        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-primary font-medium">
            <Bell className="w-5 h-5" /> You're on the list! We'll notify you at launch.
          </div>
        ) : (
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 text-sm rounded-lg bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={() => { if (email) setSubmitted(true); }}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <Bell className="w-4 h-4" /> Notify Me
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
