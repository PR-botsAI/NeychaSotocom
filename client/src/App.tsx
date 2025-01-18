import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Gallery from "@/pages/gallery";
import Booking from "@/pages/booking";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/booking" component={Booking} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <footer className="py-8 bg-muted/30">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Luxury Nails. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
