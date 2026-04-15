import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PriceTicker } from "@/components/PriceTicker";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { useState } from "react";
import { Check } from "lucide-react";

const tiers = [
  { name: "Banner Placement", price: "$499/mo", features: ["728x90 banner on all pages", "~50K monthly impressions", "Click tracking dashboard", "1 banner creative"] },
  { name: "Sponsored Article", price: "$1,299", popular: true, features: ["Full-length branded article", "Homepage feature for 48h", "Social media promotion", "Permanent do-follow link"] },
  { name: "Newsletter Shoutout", price: "$349", features: ["Featured in weekly newsletter", "15K+ active subscribers", "Custom CTA button", "Performance report"] },
];

export default function AdvertisePage() {
  const { prices, loading } = useCryptoPrices(20);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  return (
    <div className="min-h-screen bg-background">
      <PriceTicker prices={prices} loading={loading} />
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">Advertise with Crypto UpTrends</h1>
        <p className="text-muted-foreground mb-10">Reach thousands of engaged crypto enthusiasts, traders, and investors.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier) => (
            <div key={tier.name} className={`bg-card border rounded-xl p-6 relative ${tier.popular ? "ring-2 ring-primary" : ""}`}>
              {tier.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">Most Popular</span>}
              <h3 className="font-semibold text-lg mb-1">{tier.name}</h3>
              <p className="text-2xl font-bold text-primary mb-4">{tier.price}</p>
              <ul className="space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-card border rounded-xl p-6 max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:davidjone0421@gmail.com?subject=Advertising Inquiry from ${form.company}&body=${form.message}`; }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <input placeholder="Company Name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <textarea placeholder="Tell us about your campaign goals..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            <button type="submit" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Send Inquiry</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
