import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Onicoplastia from "@/pages/onicoplastia";
import Diagnostico from "@/pages/diagnostico";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import { ErrorBoundary } from "@/components/error-boundary";
import ShopBanner from "@/components/shop-banner";
import SEODebug from "@/components/seo-debug";
import PerformanceOptimizer from "@/components/performance-optimizer";
import { ScrollProgress } from "@/components/scroll-progress";
import StickyMobileCTA from "@/components/sticky-mobile-cta";
import { useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pageTransition = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(4px)" },
};

const pageTransitionConfig = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1],
};

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <div className="grain-overlay" />
      <ScrollProgress />
      <ShopBanner />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransitionConfig}
          >
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/onicoplastia" component={Onicoplastia} />
              <Route path="/diagnostico" component={Diagnostico} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <StickyMobileCTA />
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
