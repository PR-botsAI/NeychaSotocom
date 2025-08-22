import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function SEODebug() {
  const [location] = useLocation();

  useEffect(() => {
    // Update meta tags based on current route
    const updateMetaTags = () => {
      const title = getPageTitle(location);
      const description = getPageDescription(location);
      
      // Update document title
      document.title = title;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);

      // Update Open Graph tags
      updateOpenGraphTags(title, description);
      
      // Add structured data
      addStructuredData(location);
    };

    updateMetaTags();
  }, [location]);

  return null;
}

function getPageTitle(location: string): string {
  const baseTitle = 'Neycha Soto - Nail Artist Professional | Puerto Rico';
  
  switch (location) {
    case '/':
      return baseTitle;
    case '/onicoplastia':
      return 'Onicoplastia Profesional | ' + baseTitle;
    case '/contact':
      return 'Contacto y Reservas | ' + baseTitle;
    default:
      return baseTitle;
  }
}

function getPageDescription(location: string): string {
  switch (location) {
    case '/':
      return 'Especialista en restauración de uñas y nail art premium en Puerto Rico. Onicoplastia certificada IBX®. Transforma tus uñas con resultados excepcionales.';
    case '/onicoplastia':
      return 'Tratamiento profesional de onicoplastia para hongos y daños en uñas. Resultados visibles desde la primera sesión. Procedimiento indoloro y no invasivo.';
    case '/contact':
      return 'Reserva tu cita con Neycha Soto en Hatillo, Puerto Rico. Consultas por WhatsApp disponibles. Solo con cita previa.';
    default:
      return 'Especialista en restauración de uñas y nail art premium en Puerto Rico.';
  }
}

function updateOpenGraphTags(title: string, description: string) {
  const ogTags = [
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: window.location.href },
    { property: 'og:image', content: '/assets/HeroLogoWhiteTrasparent.png' },
    { property: 'og:locale', content: 'es_PR' },
    { property: 'og:site_name', content: 'Neycha Soto Nail Artist' },
  ];

  ogTags.forEach(tag => {
    let meta = document.querySelector(`meta[property="${tag.property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', tag.property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', tag.content);
  });
}

function addStructuredData(location: string) {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  const baseData = {
    '@context': 'https://schema.org',
    '@type': 'NailSalon',
    name: 'Neycha Soto Nail Artist',
    description: 'Especialista en restauración de uñas y nail art premium',
    url: 'https://neychasoto.com',
    telephone: '+1-939-429-0292',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hatillo',
      addressRegion: 'PR',
      addressCountry: 'Puerto Rico'
    },
    openingHours: 'Tu-Sa',
    priceRange: '$$',
    sameAs: [
      'https://www.instagram.com/neychanails',
      'https://www.facebook.com/neychanailscom',
      'https://shop.neychasoto.com'
    ]
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(baseData);
  document.head.appendChild(script);
}