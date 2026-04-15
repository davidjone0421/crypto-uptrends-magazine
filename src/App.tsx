import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import ArticleDetail from "./pages/ArticleDetail";
import CategoryPage from "./pages/CategoryPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CareersPage from "./pages/CareersPage";
import AdvertisePage from "./pages/AdvertisePage";
import LearnCryptoPage from "./pages/LearnCryptoPage";
import MarketDataPage from "./pages/MarketDataPage";
import ExchangesPage from "./pages/ExchangesPage";
import PortfolioTrackerPage from "./pages/PortfolioTrackerPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/advertise" element={<AdvertisePage />} />
            <Route path="/learn-crypto" element={<LearnCryptoPage />} />
            <Route path="/market-data" element={<MarketDataPage />} />
            <Route path="/exchanges" element={<ExchangesPage />} />
            <Route path="/portfolio-tracker" element={<PortfolioTrackerPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
