import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PriceTicker } from "@/components/PriceTicker";
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen } from "lucide-react";

const faqs = [
  { q: "What is Cryptocurrency?", a: "Cryptocurrency is a digital or virtual currency that uses cryptography for security. Unlike traditional currencies issued by governments, cryptocurrencies operate on decentralized networks based on blockchain technology — a distributed ledger enforced by a network of computers (nodes). Bitcoin, created in 2009, was the first cryptocurrency and remains the most widely recognized." },
  { q: "How does Blockchain work?", a: "A blockchain is a chain of blocks, where each block contains a list of transactions. When a new transaction occurs, it's broadcast to a network of peer-to-peer computers. These nodes validate the transaction using known algorithms. Once verified, the transaction is combined with others to create a new block, which is then added to the existing chain permanently. This makes the data extremely difficult to alter retroactively." },
  { q: "How to store Bitcoin securely?", a: "There are several ways to store Bitcoin: Hardware wallets (like Ledger or Trezor) keep your private keys offline and are considered the most secure. Software wallets are apps on your phone or computer. Exchange wallets are custodial — the exchange holds your keys. For maximum security, use a hardware wallet and keep your recovery seed phrase in a safe, offline location. Never share your private keys." },
  { q: "What is DeFi (Decentralized Finance)?", a: "DeFi refers to financial services built on blockchain networks that operate without traditional intermediaries like banks. DeFi applications include lending and borrowing platforms (Aave, Compound), decentralized exchanges (Uniswap), and yield farming protocols. Users interact directly with smart contracts, maintaining full control of their assets." },
  { q: "What are Altcoins?", a: "Altcoins are all cryptocurrencies other than Bitcoin. The term stands for 'alternative coins.' Major altcoins include Ethereum (ETH), Solana (SOL), Cardano (ADA), and Ripple (XRP). Each typically offers different features — Ethereum enables smart contracts, Solana prioritizes speed, and so on. There are thousands of altcoins with varying use cases and market capitalizations." },
  { q: "How do I start investing in Crypto?", a: "1. Research and educate yourself about different cryptocurrencies. 2. Choose a reputable exchange (Coinbase, Binance, Kraken). 3. Create and verify your account. 4. Start with a small amount you can afford to lose. 5. Consider dollar-cost averaging (DCA) — investing fixed amounts at regular intervals. 6. Transfer your crypto to a personal wallet for security. Always do your own research (DYOR) before investing." },
];

export default function LearnCryptoPage() {
  const { prices, loading } = useCryptoPrices(20);

  return (
    <div className="min-h-screen bg-background">
      <PriceTicker prices={prices} loading={loading} />
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-3xl">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Crypto 101: Beginner's Guide</h1>
        </div>
        <p className="text-muted-foreground mb-10">Everything you need to know to get started with cryptocurrency.</p>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-5">
              <AccordionTrigger className="text-sm font-semibold">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Footer />
    </div>
  );
}
