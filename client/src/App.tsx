import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Onicoplastia from "@/pages/onicoplastia";
import SobreMi from "@/pages/sobre-mi";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import { ErrorBoundary } from "@/components/error-boundary";
import SEODebug from "@/components/seo-debug";
import PerformanceOptimizer from "@/components/performance-optimizer";
import StickyMobileCTA from "@/components/sticky-mobile-cta";
import { useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { initSmoothScroll, scrollToTop } from "@/lib/scroll";

// Route changes must feel instant — anything slower reads as broken
const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

function DiagnosticoRedirect() {
  const [, navigate] = useLocation();
  useEffect(() => {
    navigate("/onicoplastia");
  }, [navigate]);
  return null;
}

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    return initSmoothScroll();
  }, []);

  useEffect(() => {
    scrollToTop(true);
  }, [location]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col relative">
      <div className="kinetic-bg" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main className="flex-1 relative z-[1]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/onicoplastia" component={Onicoplastia} />
              <Route path="/sobre-mi" component={SobreMi} />
              <Route path="/contact" component={Contact} />
              <Route path="/diagnostico" component={DiagnosticoRedirect} />
              <Route component={NotFound} />
            </Switch>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      {/* Clearance for the fixed mobile booking bar so it never covers the
          footer's last line when scrolled to the bottom */}
      <div className="h-28 md:hidden" aria-hidden="true" />
      <StickyMobileCTA />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <MotionConfig reducedMotion="user">
          <PerformanceOptimizer />
          <SEODebug />
          <Router />
          <Toaster />
        </MotionConfig>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
