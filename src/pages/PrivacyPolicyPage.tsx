import { PriceTicker } from "@/components/PriceTicker";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";

export default function PrivacyPolicyPage() {
  const { prices, loading } = useCryptoPrices();

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Privacy Policy | Crypto UpTrends" description="Learn how Crypto UpTrends collects, uses, and protects your personal information." />
      <PriceTicker prices={prices} loading={loading} />
      <Header />
      <main className="container mx-auto px-4 lg:px-8 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        {[
          { title: "Information We Collect", body: "We collect information you provide directly, such as your email address when subscribing to our newsletter. We also automatically collect usage data including browser type, pages visited, and time spent on our site through standard analytics tools." },
          { title: "How We Use Your Information", body: "Your information is used to deliver and improve our services, send newsletters you've subscribed to, analyze site traffic, and ensure the security of our platform. We never sell your personal data to third parties." },
          { title: "Cookies & Tracking", body: "We use essential cookies to maintain site functionality and analytics cookies to understand user behavior. You can control cookie preferences through your browser settings at any time." },
          { title: "Data Security", body: "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of internet transmission is 100% secure." },
          { title: "Third-Party Services", body: "Our site may contain links to external websites and uses third-party APIs (such as CoinGecko) for market data. These services have their own privacy policies that we encourage you to review." },
          { title: "Your Rights", body: "You may request access to, correction of, or deletion of your personal data at any time by contacting us at davidjone0421@gmail.com. We will respond to all requests within 30 days." },
          { title: "Contact Us", body: "If you have questions about this Privacy Policy, please email us at davidjone0421@gmail.com." },
        ].map((section) => (
          <div key={section.title} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{section.body}</p>
          </div>
        ))}
        <p className="text-xs text-muted-foreground mt-10">Last updated: April 2026</p>
      </main>
      <Footer />
    </div>
  );
}
