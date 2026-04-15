import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PriceTicker } from "@/components/PriceTicker";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { SEO } from "@/components/SEO";
import { Briefcase, MapPin, Clock } from "lucide-react";

const jobs = [
  { title: "Crypto News Editor", type: "Full-time · Remote", desc: "Write and curate daily cryptocurrency news coverage. 3+ years of experience in journalism or crypto media required." },
  { title: "Web3 Researcher", type: "Full-time · Remote", desc: "Conduct deep-dive research into DeFi protocols, Layer 2 solutions, and emerging blockchain trends." },
  { title: "Frontend Developer (React)", type: "Contract · Remote", desc: "Build and maintain our React-based news platform. Proficiency in TypeScript, Tailwind CSS, and REST APIs." },
];

export default function CareersPage() {
  const { prices, loading } = useCryptoPrices(20);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Careers" description="Join the Crypto UpTrends team — explore open positions in crypto journalism and development." url="/careers" />
      <PriceTicker prices={prices} loading={loading} />
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Join Our Team</h1>
        <p className="text-muted-foreground mb-10">We're building the future of crypto media. Come shape it with us.</p>

        <div className="space-y-5">
          {jobs.map((job) => (
            <div key={job.title} className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" />{job.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />Remote</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{job.desc}</p>
                </div>
                <a href="mailto:davidjone0421@gmail.com?subject=Application: {job.title}" className="shrink-0 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity text-center">
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
