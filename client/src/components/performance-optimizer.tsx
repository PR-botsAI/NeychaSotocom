import { useEffect } from "react";

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preconnect to external domains for faster loading
    const preconnectLinks = [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://shop.neychasoto.com" },
      { rel: "dns-prefetch", href: "https://shop.neychasoto.com" },
      { rel: "preconnect", href: "https://booksy.com" },
      { rel: "dns-prefetch", href: "https://booksy.com" },
    ];

    preconnectLinks.forEach(link => {
      const existingLink = document.querySelector(`link[href="${link.href}"][rel="${link.rel}"]`);
      if (!existingLink) {
        const linkElement = document.createElement("link");
        linkElement.rel = link.rel;
        linkElement.href = link.href;
        if (link.rel === "preconnect") {
          linkElement.crossOrigin = "anonymous";
        }
        document.head.appendChild(linkElement);
      }
    });

    // Add viewport meta tag for better mobile performance
    let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0';
      document.head.appendChild(viewport);
    }

    // Add theme color for mobile browsers
    let themeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!themeColor) {
      themeColor = document.createElement('meta');
      themeColor.name = 'theme-color';
      themeColor.content = '#000000';
      document.head.appendChild(themeColor);
    }

    // Enable smooth scrolling with CSS
    document.documentElement.style.scrollBehavior = 'smooth';

    // Optimize images loading
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        const imgElement = img as HTMLImageElement;
        if (imgElement.dataset.src) {
          imgElement.src = imgElement.dataset.src;
        }
      });
    }

    // Prefetch important pages on hover
    const prefetchOnHover = () => {
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          const href = link.getAttribute('href');
          if (href && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
            const prefetch = document.createElement('link');
            prefetch.rel = 'prefetch';
            prefetch.href = href;
            document.head.appendChild(prefetch);
          }
        }, { once: true });
      });
    };

    // Run prefetch after initial load
    if (document.readyState === 'complete') {
      prefetchOnHover();
    } else {
      window.addEventListener('load', prefetchOnHover);
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return null;
}