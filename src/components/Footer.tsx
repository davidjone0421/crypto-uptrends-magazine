import { TrendingUp, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-footer text-footer mt-12">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
              <span className="font-heading text-lg font-bold text-foreground">
                Crypto <span className="text-primary">UpTrends</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              Your trusted source for cryptocurrency news, market analysis, and blockchain insights. Stay ahead of the curve.
            </p>
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

          {/* About */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3 text-sm">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/advertise" className="hover:text-primary transition-colors">Advertise</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/market-data" className="hover:text-primary transition-colors">Market Data</Link></li>
              <li><Link to="/exchanges" className="hover:text-primary transition-colors">Exchanges</Link></li>
              <li><Link to="/learn-crypto" className="hover:text-primary transition-colors">Learn Crypto</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-3 text-sm">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/bitcoin-news" className="hover:text-primary transition-colors">Bitcoin</Link></li>
              <li><Link to="/category/altcoin-updates" className="hover:text-primary transition-colors">Altcoins</Link></li>
              <li><Link to="/category/ai-web3" className="hover:text-primary transition-colors">Web3</Link></li>
              <li><Link to="/category/market-analysis" className="hover:text-primary transition-colors">Market Analysis</Link></li>
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
