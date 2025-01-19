export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 Neycha Nails
          </div>
          <div className="text-sm text-muted-foreground">
            Powered by: <a href="https://prbots.ai" target="_blank" rel="noopener noreferrer" className="text-[#FF00FF] hover:text-[#CC00CC] transition-colors">PRbots.AI</a>
          </div>
        </div>
      </div>
    </footer>
  );
}