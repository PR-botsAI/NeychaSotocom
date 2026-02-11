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
  switch (location) {
    case '/':
      return 'Neycha Soto | Reconstrucción Estética de Uñas | Sal Usando Sandalias | Onicoplastia Hatillo PR';
    case '/onicoplastia':
      return 'Reconstrucción Estética de Uñas | Antes y Después | Onicoplastia para Hombres y Mujeres | Neycha Soto PR';
    case '/contact':
      return 'Reserva Tu Cita de Onicoplastia | Neycha Soto | Reconstrucción Estética de Uñas | Hatillo PR';
    default:
      return 'Neycha Soto | Reconstrucción Estética de Uñas | Onicoplastia | Hatillo PR';
  }
}

function getPageDescription(location: string): string {
  switch (location) {
    case '/':
      return '¿Llevas años escondiendo tus pies o manos? Reconstrucción estética de uñas dañadas por hongos, trauma o condiciones médicas. Sal usando sandalias con apariencia perfecta. Para hombres y mujeres. Primera visita $120. Neycha Soto, enfermera certificada IBX® en Hatillo, PR.';
    case '/onicoplastia':
      return 'Reconstrucción estética de uñas: ve casos reales antes y después. Apariencia perfecta para uñas dañadas por hongos o trauma. Para hombres y mujeres. Neycha Soto, especialista certificada IBX® en Hatillo, PR. Primera visita $120, seguimientos $80.';
    case '/contact':
      return 'Reserva tu cita de reconstrucción estética de uñas con Neycha Soto en Hatillo, Puerto Rico. Para hombres y mujeres. Sal usando sandalias con confianza. Primera visita $120. Estudio privado, solo con cita.';
    default:
      return 'Reconstrucción estética de uñas dañadas por hongos, trauma o condiciones médicas. Neycha Soto, especialista en onicoplastia en Hatillo, Puerto Rico. Apariencia perfecta para hombres y mujeres. Vive con confianza.';
  }
}

function getPageKeywords(location: string): string {
  const baseKeywords = 'Neycha Soto, neychasoto.com, onicoplastia Hatillo Puerto Rico, reconstrucción estética uñas PR, uñas dañadas solución, especialista certificada IBX, onicoplastia hombres y mujeres';

  switch (location) {
    case '/':
      return `${baseKeywords}, reconstrucción estética uñas hongos Puerto Rico, apariencia perfecta uñas, sal usando sandalias, estudio privado Hatillo, primera visita $120`;
    case '/onicoplastia':
      return `${baseKeywords}, onicoplastia antes y después Puerto Rico, reconstrucción estética uñas Hatillo, galería casos reales onicoplastia PR, apariencia perfecta uñas dañadas, fotos antes después uñas Hatillo`;
    case '/contact':
      return `cita onicoplastia Hatillo, reservar reconstrucción estética uñas PR, cita especialista uñas, contacto Neycha Soto, estudio privado Hatillo Puerto Rico`;
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
    { property: 'og:image', content: 'https://neychasoto.com/assets/nail-transformation-results.jpg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'es_PR' },
    { property: 'og:locale:alternate', content: 'es_US' },
    { property: 'og:site_name', content: 'Neycha Soto - Especialista en Onicoplastia Puerto Rico' },
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
    { name: 'twitter:image', content: 'https://neychasoto.com/assets/nail-transformation-twitter.jpg' },
    { name: 'twitter:image:alt', content: 'Reconstrucción estética de uñas antes y después - Onicoplastia Puerto Rico por Neycha Soto' },
    { name: 'twitter:site', content: '@neychasoto_com' },
    { name: 'twitter:creator', content: '@neychasoto_com' },
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
      name: 'Onicoplastia - Reconstrucción Estética de Uñas',
      description: 'Reconstrucción estética de uñas dañadas por hongos, trauma o condiciones médicas. Sal usando sandalias con apariencia perfecta. Para hombres y mujeres. No es un tratamiento médico curativo; condiciones subyacentes pueden requerir seguimiento. Especialista certificada IBX® en Hatillo, PR.',
      serviceType: 'Reconstrucción estética de uñas',
      areaServed: 'Hatillo, Puerto Rico',
      provider: {
        '@type': 'Person',
        name: 'Neycha Soto',
        jobTitle: 'Enfermera Registrada y Especialista Certificada IBX® en Uñas',
        worksFor: {
          '@type': 'LocalBusiness',
          name: 'Neycha Soto Nail Specialist',
          url: 'https://neychasoto.com'
        }
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Primera Visita',
          price: '120',
          priceCurrency: 'USD'
        },
        {
          '@type': 'Offer',
          name: 'Seguimiento',
          price: '80',
          priceCurrency: 'USD'
        }
      ]
    };
  } else {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Neycha Soto - Reconstrucción Estética de Uñas',
      url: 'https://neychasoto.com',
      description: 'Reconstrucción estética de uñas dañadas por hongos, trauma o condiciones médicas. Sal usando sandalias con apariencia perfecta. Para hombres y mujeres. Enfermera registrada certificada IBX® en Hatillo, Puerto Rico.',
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
    name: 'Neycha Soto - Onicoplastia Puerto Rico',
    alternateName: 'Neycha Nails - Especialista en Reconstrucción Estética de Uñas',
    image: [
      'https://neychasoto.com/assets/nail-transformation-gallery.jpg',
      'https://neychasoto.com/assets/professional-consultation.jpg'
    ],
    logo: 'https://neychasoto.com/assets/logo-neychasoto.png',
    url: 'https://neychasoto.com',
    telephone: '+1-939-429-0292',
    description: 'Reconstrucción estética de uñas dañadas por hongos, trauma o condiciones médicas. Sal usando sandalias con apariencia perfecta. Para hombres y mujeres. Enfermera certificada IBX® en Hatillo, Puerto Rico. Primera visita $120, seguimientos $80. Solo con cita previa.',
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
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
    currenciesAccepted: 'USD',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Onicoplastia y Reconstrucción Estética de Uñas',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Onicoplastia - Primera Visita',
            description: 'Reconstrucción estética de uñas dañadas por hongos, trauma o condiciones médicas. Sal usando sandalias con apariencia perfecta. Incluye IBX® y GEL Polish. $120. No es un tratamiento médico curativo.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Seguimiento de Onicoplastia',
            description: 'Mantenimiento de la reconstrucción estética y apariencia perfecta de las uñas. $80 por sesión. Solo con cita previa en Hatillo, PR.'
          }
        }
      ]
    },
    sameAs: [
      'https://www.instagram.com/neychasoto_com/',
      'https://www.facebook.com/neychasotocom',
      'https://shop.neychasoto.com',
      'https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '40',
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