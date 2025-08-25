import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function SEODebug() {
  const [location] = useLocation();

  useEffect(() => {
    // Update meta tags based on current route
    const title = getPageTitle(location);
    const description = getPageDescription(location);
    const keywords = getPageKeywords(location);
    
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

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);
    
    // Update Open Graph tags
    updateOpenGraphTags(title, description);
    
    // Update Twitter Card tags
    updateTwitterCardTags(title, description);
    
    // Add structured data
    addStructuredData(location);

    // Add local business schema
    addLocalBusinessSchema();
    
  }, [location]);

  return null;
}

function getPageTitle(location: string): string {
  const brandName = 'Neycha Soto';
  
  switch (location) {
    case '/':
      return `${brandName} | Especialista en Onicoplastia y Nail Art en Hatillo, PR`;
    case '/onicoplastia':
      return `Onicoplastia Profesional en Hatillo | ${brandName} - Tratamiento de Hongos en Uñas`;
    case '/contact':
      return `Contacto y Citas | ${brandName} - Salón de Uñas en Hatillo, Puerto Rico`;
    default:
      return `${brandName} | Nail Artist Profesional en Hatillo, Puerto Rico`;
  }
}

function getPageDescription(location: string): string {
  switch (location) {
    case '/':
      return 'Neycha Soto ofrece servicios profesionales de onicoplastia, manicura y pedicura en Hatillo, Puerto Rico. Especialista certificada IBX® con más de 20 años de experiencia. Tratamientos para hongos en uñas, nail art y productos profesionales. Reserva tu cita hoy.';
    case '/onicoplastia':
      return 'Tratamiento profesional de onicoplastia en Hatillo, PR por Neycha Soto. Elimina hongos en uñas de forma segura y eficaz. Primera cita $75, seguimientos $40-50. Resultados visibles desde la primera sesión. Procedimiento indoloro certificado IBX®.';
    case '/contact':
      return 'Reserva tu cita con Neycha Soto en 166 Avenida Dr Susoni, Hatillo, PR 00659. WhatsApp: +1-939-429-0292. Horarios de martes a sábado. Solo con cita previa. 5.0 estrellas con 37 reseñas verificadas en Booksy.';
    default:
      return 'Neycha Soto - Especialista en uñas profesional en Hatillo, Puerto Rico. Onicoplastia, manicura, pedicura y nail art. Certificada IBX® con productos aprobados y probados en salón.';
  }
}

function getPageKeywords(location: string): string {
  const baseKeywords = 'Neycha Soto, neychasoto.com, nail salon Hatillo, salón de uñas Hatillo, manicura Hatillo PR, pedicura Hatillo Puerto Rico, nail art Hatillo, uñas acrílicas Hatillo, gel nails Hatillo';
  
  switch (location) {
    case '/':
      return `${baseKeywords}, mejor salón de uñas Hatillo, best nail salon Hatillo PR, manicure pedicure Puerto Rico, nail artist Puerto Rico, IBX certificada, productos profesionales uñas`;
    case '/onicoplastia':
      return `onicoplastia Hatillo, onicoplastia Puerto Rico, tratamiento hongos uñas PR, nail fungus treatment Hatillo, onicomicosis Puerto Rico, onicoplastia preventiva, Neycha Soto onicoplastia, restauración de uñas, hongos en uñas tratamiento`;
    case '/contact':
      return `Neycha Soto contacto, citas nail salon Hatillo, reservar manicura Hatillo, WhatsApp nail artist PR, 166 Avenida Dr Susoni Hatillo, Booksy Neycha Soto, nail appointment Puerto Rico`;
    default:
      return baseKeywords;
  }
}

function updateOpenGraphTags(title: string, description: string) {
  const ogTags = [
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: window.location.href },
    { property: 'og:image', content: 'https://neychasoto.com/assets/og-image.jpg' },
    { property: 'og:locale', content: 'es_PR' },
    { property: 'og:locale:alternate', content: 'en_US' },
    { property: 'og:site_name', content: 'Neycha Soto - neychasoto.com' },
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

function updateTwitterCardTags(title: string, description: string) {
  const twitterTags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: 'https://neychasoto.com/assets/twitter-card.jpg' },
    { name: 'twitter:site', content: '@neychanails' },
    { name: 'twitter:creator', content: '@neychanails' },
  ];

  twitterTags.forEach(tag => {
    let meta = document.querySelector(`meta[name="${tag.name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', tag.name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', tag.content);
  });
}

function addStructuredData(location: string) {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]:not(#local-business-schema)');
  if (existingScript) {
    existingScript.remove();
  }

  let structuredData: any;

  if (location === '/onicoplastia') {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Onicoplastia - Tratamiento de Hongos en Uñas',
      description: 'Tratamiento profesional de onicoplastia para eliminar hongos en uñas. Procedimiento indoloro y no invasivo con resultados visibles desde la primera sesión.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Neycha Soto',
        url: 'https://neychasoto.com'
      },
      areaServed: {
        '@type': 'City',
        name: 'Hatillo',
        addressRegion: 'PR'
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Primera Cita - Evaluación',
          price: '75.00',
          priceCurrency: 'USD'
        },
        {
          '@type': 'Offer',
          name: 'Seguimiento 2 Semanas',
          price: '40.00',
          priceCurrency: 'USD'
        },
        {
          '@type': 'Offer',
          name: 'Seguimiento Mensual',
          price: '50.00',
          priceCurrency: 'USD'
        }
      ]
    };
  } else {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Neycha Soto',
      url: 'https://neychasoto.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://neychasoto.com/?s={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    };
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

function addLocalBusinessSchema() {
  // Check if already added
  const existingScript = document.querySelector('script#local-business-schema');
  if (existingScript) return;

  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'NailSalon',
    '@id': 'https://neychasoto.com/#business',
    name: 'Neycha Soto',
    image: 'https://neychasoto.com/assets/salon-image.jpg',
    logo: 'https://neychasoto.com/assets/logo.png',
    url: 'https://neychasoto.com',
    telephone: '+1-939-429-0292',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '166 Avenida Dr Susoni, Unit 166',
      addressLocality: 'Hatillo',
      addressRegion: 'PR',
      postalCode: '00659',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.4851,
      longitude: -66.8254
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00'
      }
    ],
    priceRange: '$$',
    servesCuisine: 'Nail Services',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
    currenciesAccepted: 'USD',
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Wheelchair accessible',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Parking',
        value: true
      }
    ],
    sameAs: [
      'https://www.instagram.com/neychanails',
      'https://www.facebook.com/neychanailscom',
      'https://shop.neychasoto.com',
      'https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '37',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'local-business-schema';
  script.textContent = JSON.stringify(localBusinessData);
  document.head.appendChild(script);
}