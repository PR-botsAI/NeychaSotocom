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
      return 'Neycha Soto | Termina con los Problemas de Hongos en las Uñas Para Siempre | Onicoplastia Hatillo PR';
    case '/onicoplastia':
      return 'Transformaciones Reales de Uñas en Puerto Rico | Onicoplastia Premium | Antes y Después | Neycha Soto';
    case '/contact':
      return 'Reserva Tu Consulta de Onicoplastia | Neycha Soto | Transforma Tus Uñas Hoy';
    default:
      return 'Neycha Soto | Especialista en Onicoplastia | Transforma Uñas Problemáticas | Hatillo PR';
  }
}

function getPageDescription(location: string): string {
  switch (location) {
    case '/':
      return '¿Cansada de esconder tus uñas? Neycha Soto ha ayudado a cientos a transformar sus problemas de uñas con onicoplastia profesional. Enfermera registrada y certificada IBX®. Ve resultados en tu primera sesión. Reserva tu consulta en Hatillo, PR.';
    case '/onicoplastia':
      return 'Una imagen vale más que mil palabras. Ve transformaciones reales de onicoplastia antes y después. Neycha Soto, especialista certificada IBX® en Hatillo, PR. Resultados visibles en una sola sesión, galería de casos reales, $100 primera evaluación.';
    case '/contact':
      return '¿Lista para arreglar tus problemas de uñas de una vez por todas? Reserva tu consulta de onicoplastia con Neycha Soto en Hatillo, Puerto Rico. Enfermera registrada especialista en transformación de uñas. Citas limitadas disponibles - asegura la tuya hoy.';
    default:
      return 'Transforma tus uñas problemáticas con tratamiento comprobado de onicoplastia. Neycha Soto se especializa en soluciones permanentes para uñas en Hatillo, Puerto Rico. Deja de esconderte - comienza a vivir con confianza.';
  }
}

function getPageKeywords(location: string): string {
  const baseKeywords = 'Neycha Soto, neychasoto.com, onicoplastia Hatillo Puerto Rico, tratamiento hongos uñas PR, solución problemas uñas, restauración profesional uñas, especialista certificada IBX, transformación uñas Hatillo';
  
  switch (location) {
    case '/':
      return `${baseKeywords}, especialista hongos uñas Puerto Rico, solución permanente uñas, confianza uñas, transformar uñas problemáticas, cuidado profesional uñas Hatillo, experta salud uñas PR`;
    case '/onicoplastia':
      return `${baseKeywords}, onicoplastia antes y después Puerto Rico, transformaciones reales uñas Hatillo, galería resultados onicoplastia PR, casos reales transformación uñas, onicoplastia premium Puerto Rico, resultados visibles una sesión, fotos antes después uñas Hatillo`;
    case '/contact':
      return `consulta onicoplastia Hatillo, reservar tratamiento uñas PR, cita especialista uñas, contacto Neycha Soto, consulta profesional uñas Puerto Rico, reserva transformación uñas`;
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
    { name: 'twitter:image:alt', content: 'Transformaciones reales de uñas antes y después - Onicoplastia Puerto Rico por Neycha Soto' },
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
      '@type': 'MedicalProcedure',
      name: 'Onicoplastia Premium - Transformaciones Visibles',
      description: 'Ve las transformaciones reales con nuestra galería antes y después. Tratamiento de onicoplastia con resultados visibles en una sola sesión. Especialista certificada IBX® con casos documentados en Hatillo, PR.',
      procedureType: 'Restauración terapéutica de uñas',
      bodyLocation: 'Uñas',
      preparation: 'Consulta y evaluación de uñas',
      howPerformed: 'Aplicación profesional de productos y técnicas especializadas',
      followup: 'Citas de seguimiento para monitorear el progreso',
      provider: {
        '@type': 'Person',
        name: 'Neycha Soto',
        jobTitle: 'Especialista Certificada en Uñas',
        worksFor: {
          '@type': 'LocalBusiness',
          name: 'Neycha Soto Nail Specialist',
          url: 'https://neychasoto.com'
        }
      }
    };
  } else {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Neycha Soto - Especialista en Onicoplastia',
      url: 'https://neychasoto.com',
      description: 'Tratamiento profesional de onicoplastia para problemas de uñas. Transforma tus uñas con técnicas comprobadas. Enfermera registrada certificada IBX®.',
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
    alternateName: 'Neycha Nails - Especialista en Restauración de Uñas',
    image: [
      'https://neychasoto.com/assets/nail-transformation-gallery.jpg',
      'https://neychasoto.com/assets/professional-consultation.jpg'
    ],
    logo: 'https://neychasoto.com/assets/logo-neychasoto.png',
    url: 'https://neychasoto.com',
    telephone: '+1-939-429-0292',
    description: 'Especialista certificada IBX® en onicoplastia y restauración de uñas en Hatillo, Puerto Rico. Transformaciones reales antes y después. Primera evaluación $100. Solo con cita previa.',
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
      name: 'Servicios de Onicoplastia y Restauración de Uñas',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Onicoplastia Premium',
            description: 'Tratamiento profesional de onicoplastia con resultados visibles en una sesión. Incluye GEL Polish. Primera evaluación $100, seguimientos $60.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Evaluación y Consulta Personalizada',
            description: 'Evaluación completa de uñas con plan de tratamiento personalizado. Solo con cita previa en Hatillo, PR.'
          }
        }
      ]
    },
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