import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Onicoplastia from "@/pages/onicoplastia";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import { ErrorBoundary } from "@/components/error-boundary";
import ShopBanner from "@/components/shop-banner";
import SEODebug from "@/components/seo-debug";
import PerformanceOptimizer from "@/components/performance-optimizer";
import { ScrollProgress } from "@/components/scroll-progress";
import { useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollProgress />
      <ShopBanner />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/onicoplastia" component={Onicoplastia} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <PerformanceOptimizer />
        <SEODebug />
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
