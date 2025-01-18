import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Transform Your Nails
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Experience luxury nail care with our premium services and expert technicians.
            Book your appointment today and discover the art of beautiful nails.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/booking">
              <Button size="lg" className="text-lg">
                Book Now
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="text-lg">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-white/70 backdrop-blur-sm" />
    </div>
  );
}
