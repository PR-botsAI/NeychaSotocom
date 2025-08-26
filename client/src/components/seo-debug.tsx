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
      return 'Neycha Soto | Especialista en Nail Art y Onicoplastia | Hatillo, Puerto Rico';
    case '/onicoplastia':
      return 'Onicoplastia Profesional | Neycha Soto | Especialista Certificada IBX® Hatillo PR';
    case '/contact':
      return 'Contacto y Citas | Neycha Soto | Nail Specialist Hatillo Puerto Rico';
    default:
      return 'Neycha Soto | Professional Nail Artist | Hatillo, Puerto Rico';
  }
}

function getPageDescription(location: string): string {
  switch (location) {
    case '/':
      return 'Especialista profesional en nail art y onicoplastia en Hatillo, Puerto Rico. Neycha Soto ofrece servicios de alta calidad con más de 20 años de experiencia. Certificada IBX® con productos premium. Agenda tu consulta.';
    case '/onicoplastia':
      return 'Tratamiento profesional de onicoplastia en Hatillo, Puerto Rico. Neycha Soto, especialista certificada IBX®, ofrece soluciones efectivas para hongos en uñas. Procedimiento seguro con resultados comprobados.';
    case '/contact':
      return 'Agenda tu cita con Neycha Soto en Hatillo, Puerto Rico. Consultas personalizadas disponibles en 166 Avenida Dr Susoni. Contacto directo por WhatsApp. Horarios flexibles de martes a sábado.';
    default:
      return 'Neycha Soto, especialista profesional en cuidado de uñas en Hatillo, Puerto Rico. Servicios de onicoplastia, manicura y nail art con productos de la más alta calidad.';
  }
}

function getPageKeywords(location: string): string {
  const baseKeywords = 'Neycha Soto, neychasoto.com, nail specialist Hatillo, especialista uñas Puerto Rico, onicoplastia profesional, manicura Hatillo PR, nail art Puerto Rico, IBX certificada, salon profesional Hatillo';
  
  switch (location) {
    case '/':
      return `${baseKeywords}, professional nail care, beauty salon Hatillo Puerto Rico, nail artist PR, manicure pedicure specialist, premium nail services`;
    case '/onicoplastia':
      return `onicoplastia Hatillo Puerto Rico, nail fungus treatment PR, IBX certified specialist, professional nail restoration, hongos uñas tratamiento, nail health Puerto Rico, certified nail therapist`;
    case '/contact':
      return `nail salon appointment Hatillo, contacto Neycha Soto, 166 Avenida Dr Susoni, nail consultation Puerto Rico, professional nail services booking, Hatillo beauty salon`;
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
    { property: 'og:image', content: 'https://neychasoto.com/assets/og-image-professional.jpg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'es_PR' },
    { property: 'og:locale:alternate', content: 'en_US' },
    { property: 'og:site_name', content: 'Neycha Soto - Professional Nail Specialist' },
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
    { name: 'twitter:image', content: 'https://neychasoto.com/assets/twitter-card-professional.jpg' },
    { name: 'twitter:image:alt', content: 'Neycha Soto - Professional Nail Services in Hatillo, Puerto Rico' },
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
      name: 'Onicoplastia Profesional',
      description: 'Tratamiento especializado de onicoplastia para cuidado y restauración de uñas. Servicio profesional certificado IBX® con resultados comprobados.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Neycha Soto',
        url: 'https://neychasoto.com',
        telephone: '+1-939-429-0292',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '166 Avenida Dr Susoni, Unit 166',
          addressLocality: 'Hatillo',
          addressRegion: 'PR',
          postalCode: '00659',
          addressCountry: 'US'
        }
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Hatillo',
          addressRegion: 'PR'
        }
      ]
    };
  } else {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Neycha Soto - Professional Nail Specialist',
      url: 'https://neychasoto.com',
      description: 'Especialista profesional en cuidado de uñas en Hatillo, Puerto Rico. Servicios de onicoplastia y nail art con productos premium.',
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
    image: [
      'https://neychasoto.com/assets/salon-professional-1.jpg',
      'https://neychasoto.com/assets/nail-work-portfolio.jpg'
    ],
    logo: 'https://neychasoto.com/assets/logo-neychasoto.png',
    url: 'https://neychasoto.com',
    telephone: '+1-939-429-0292',
    description: 'Especialista profesional en cuidado de uñas con más de 20 años de experiencia. Servicios de onicoplastia, manicura y nail art con certificación IBX® en Hatillo, Puerto Rico.',
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
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Professional consultation',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Premium products',
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