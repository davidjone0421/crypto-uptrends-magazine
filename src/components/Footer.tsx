import { TrendingUp, Send } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-footer text-footer mt-12">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
              <span className="font-heading text-lg font-bold text-foreground">
                Crypto <span className="text-primary">UpTrends</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              Your trusted source for cryptocurrency news, market analysis, and blockchain insights. Stay ahead of the curve.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-lg bg-secondary/10 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Subscribe
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3 text-sm">About</h4>
            <ul className="space-y-2 text-sm">
              {["About Us", "Contact", "Careers", "Advertise"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-primary transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Market Data", "Portfolio Tracker", "Exchanges", "Learn Crypto"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-primary transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3 text-sm">Categories</h4>
            <ul className="space-y-2 text-sm">
              {["Bitcoin", "Altcoins", "DeFi", "NFTs", "Web3"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-primary transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/20 mt-10 pt-6 text-center text-xs">
          © 2026 cryptouptrends.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
