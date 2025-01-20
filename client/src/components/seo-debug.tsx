import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SEODebug() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'meta' | 'schema' | 'robots'>('meta');

  // Only show in development
  if (process.env.NODE_ENV === 'production') return null;

  const metaTags = document.getElementsByTagName('meta');
  const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
  
  const renderMetaInfo = () => (
    <div className="space-y-4">
      <h3 className="font-semibold">Meta Tags</h3>
      <div className="bg-muted p-4 rounded-md space-y-2 max-h-96 overflow-auto">
        {Array.from(metaTags).map((tag, index) => (
          <div key={index} className="text-sm">
            {Object.values(tag.attributes).map(attr => (
              <span key={attr.name} className="block">
                <span className="text-primary">{attr.name}</span>: {attr.value}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSchemaInfo = () => (
    <div className="space-y-4">
      <h3 className="font-semibold">Schema Markup</h3>
      <div className="bg-muted p-4 rounded-md space-y-2 max-h-96 overflow-auto">
        {Array.from(schemaScripts).map((script, index) => (
          <pre key={index} className="text-sm whitespace-pre-wrap">
            {JSON.stringify(JSON.parse(script.innerHTML), null, 2)}
          </pre>
        ))}
      </div>
    </div>
  );

  const renderRobotsInfo = async () => {
    try {
      const response = await fetch('/robots.txt');
      const text = await response.text();
      return (
        <div className="space-y-4">
          <h3 className="font-semibold">robots.txt</h3>
          <pre className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap max-h-96 overflow-auto">
            {text}
          </pre>
        </div>
      );
    } catch (error) {
      return <div>Error loading robots.txt</div>;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="bg-background/80 backdrop-blur-sm"
      >
        SEO Debug
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>SEO Debug Information</DialogTitle>
            <DialogDescription>
              View and verify SEO implementations (Development Mode Only)
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2 mb-4">
            <Button
              variant={activeTab === 'meta' ? 'default' : 'outline'}
              onClick={() => setActiveTab('meta')}
              size="sm"
            >
              Meta Tags
            </Button>
            <Button
              variant={activeTab === 'schema' ? 'default' : 'outline'}
              onClick={() => setActiveTab('schema')}
              size="sm"
            >
              Schema
            </Button>
            <Button
              variant={activeTab === 'robots' ? 'default' : 'outline'}
              onClick={() => setActiveTab('robots')}
              size="sm"
            >
              Robots.txt
            </Button>
          </div>

          <div className="mt-4">
            {activeTab === 'meta' && renderMetaInfo()}
            {activeTab === 'schema' && renderSchemaInfo()}
            {activeTab === 'robots' && renderRobotsInfo()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
