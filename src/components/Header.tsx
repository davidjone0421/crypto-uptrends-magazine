import { useState } from "react";
import { Search, ChevronDown, TrendingUp, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AdBanner } from "./AdBanner";

const navLinks = [
  { label: "HOME", href: "/", active: true },
  { label: "CRYPTO NEWS", href: "/category/crypto-news" },
  { label: "BITCOIN NEWS", href: "/category/bitcoin-news" },
  { label: "AI & WEB3", href: "/category/ai-web3" },
  { label: "ALTCOIN UPDATES", href: "/category/altcoin-updates", dropdown: true },
  { label: "MARKET ANALYSIS", href: "/category/market-analysis", dropdown: true },
];

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-card border-b">
      {/* Top Row: Logo + Ad */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-3 gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <TrendingUp className="w-8 h-8 text-primary" />
            <span className="font-heading text-2xl font-bold tracking-tight">
              Crypto <span className="text-primary">UpTrends</span>
            </span>
          </Link>
          <div className="hidden md:block">
            <AdBanner width={728} height={90} />
          </div>
        </div>
      </div>

      {/* Bottom Row: Black Nav Bar */}
      <nav className="bg-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-11">
            <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-4 py-2.5 text-xs font-bold tracking-wide whitespace-nowrap flex items-center gap-1 transition-colors ${
                    link.active
                      ? "bg-primary text-primary-foreground"
                      : "text-background/80 hover:text-background hover:bg-background/10"
                  }`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="w-3 h-3" />}
                </Link>
              ))}
            </div>
            <div className="flex items-center">
              {searchOpen && (
                <input
                  type="text"
                  placeholder="Search..."
                  autoFocus
                  className="w-40 px-3 py-1.5 text-xs rounded bg-background/10 border border-background/20 text-background placeholder:text-background/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setSearchOpen(false);
                  }}
                />
              )}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-background/80 hover:text-background transition-colors"
              >
                {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
