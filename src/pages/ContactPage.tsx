import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PriceTicker } from "@/components/PriceTicker";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const { prices, loading } = useCryptoPrices(20);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="min-h-screen bg-background">
      <PriceTicker prices={prices} loading={loading} />
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-10">Have a question or feedback? We'd love to hear from you.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Send a Message</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:davidjone0421@gmail.com?subject=Contact from ${form.name}&body=${form.message}`; }}>
              <input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <input placeholder="Your Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <textarea placeholder="Your Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              <button type="submit" className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Send Message</button>
            </form>
          </div>
          <div className="space-y-6">
            {[
              { icon: Mail, title: "Email", text: "davidjone0421@gmail.com" },
              { icon: MapPin, title: "Location", text: "Remote — Global Team" },
              { icon: Clock, title: "Response Time", text: "Within 24 hours" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="p-2.5 bg-primary/10 rounded-lg"><item.icon className="w-5 h-5 text-primary" /></div>
                <div>
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
