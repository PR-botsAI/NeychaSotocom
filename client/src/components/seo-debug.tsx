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
      return '🔥 TOP Nail Artist en Hatillo 2025 | Neycha Soto - 5⭐ Reviews';
    case '/onicoplastia':
      return '✨ Onicoplastia $75 Hatillo PR | Neycha Soto - Elimina Hongos 2025';
    case '/contact':
      return '📞 Reserva AHORA | Neycha Soto Hatillo PR - Citas Disponibles 2025';
    default:
      return 'Neycha Soto | #1 Nail Specialist Hatillo Puerto Rico 2025';
  }
}

function getPageDescription(location: string): string {
  switch (location) {
    case '/':
      return '💎 ¡TRANSFORM tus uñas HOY! Neycha Soto, #1 en Hatillo PR. ✅ 20+ años experiencia ✅ IBX® certificada ✅ 37 reviews 5⭐ ✅ Productos ÚNICOS. ¡Reserva YA!';
    case '/onicoplastia':
      return '🚀 ELIMINA hongos en uñas ¡SIN DOLOR! Onicoplastia profesional $75 en Hatillo. ✅ Resultados desde 1ª sesión ✅ IBX® certificado. ¡Agenda HOY mismo!';
    case '/contact':
      return '📱 RESERVA tu cita con Neycha Soto ¡En 30 segundos! 📍 166 Av Dr Susoni, Hatillo ⏰ Mar-Sáb ✅ WhatsApp directo ✅ Solo texto. ¡Contáctanos AHORA!';
    default:
      return '⚡ Descubre la MEJOR nail artist de Hatillo PR. Neycha Soto transforma tus uñas con técnicas avanzadas y productos premium. ¡Experiencia única garantizada!';
  }
}

function getPageKeywords(location: string): string {
  const baseKeywords = 'Neycha Soto, neychasoto.com, nail salon Hatillo 2025, mejor salón uñas Hatillo, manicura profesional Puerto Rico, pedicura Hatillo PR, nail art premium, uñas gel acrílicas, IBX certificada, productos profesionales';
  
  switch (location) {
    case '/':
      return `${baseKeywords}, top nail artist Puerto Rico, best nail salon Hatillo PR 2025, manicure pedicure expert, nail specialist reviews 5 stars, beauty salon Hatillo, professional nail care PR`;
    case '/onicoplastia':
      return `onicoplastia Hatillo 2025, tratamiento hongos uñas Puerto Rico, nail fungus treatment PR, onicoplastia profesional $75, eliminar hongos uñas Hatillo, restauración uñas dañadas, onicomicosis tratamiento, nail restoration Puerto Rico`;
    case '/contact':
      return `citas nail salon Hatillo, reservar manicura Puerto Rico, contacto Neycha Soto, WhatsApp nail artist PR, 166 Avenida Dr Susoni Hatillo, appointment booking nail salon, nail salon near me Puerto Rico`;
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
    { property: 'og:image', content: 'https://neychasoto.com/assets/og-image-2025.jpg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
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
    { name: 'twitter:image', content: 'https://neychasoto.com/assets/twitter-card-2025.jpg' },
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
      name: 'Onicoplastia - Tratamiento Profesional de Hongos en Uñas',
      description: 'Tratamiento especializado de onicoplastia para eliminar hongos en uñas. Procedimiento indoloro y no invasivo con resultados visibles desde la primera sesión.',
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
        },
        {
          '@type': 'City', 
          name: 'Arecibo',
          addressRegion: 'PR'
        },
        {
          '@type': 'City',
          name: 'Utuado', 
          addressRegion: 'PR'
        }
      ],
      offers: [
        {
          '@type': 'Offer',
          name: 'Primera Cita - Evaluación Completa',
          price: '75.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Seguimiento 2 Semanas',
          price: '40.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Seguimiento Mensual',
          price: '50.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        }
      ]
    };
  } else {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Neycha Soto - neychasoto.com',
      url: 'https://neychasoto.com',
      description: 'Top nail artist en Hatillo, Puerto Rico. Especialista en onicoplastia, manicura y pedicura profesional.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://neychasoto.com/?s={search_term_string}',
        'query-input': 'required name=search_term_string'
      },
      about: {
        '@type': 'Thing',
        name: 'Nail Care Services',
        description: 'Professional nail care, onicoplastia, and beauty services in Puerto Rico'
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
      'https://neychasoto.com/assets/salon-image-1.jpg',
      'https://neychasoto.com/assets/salon-image-2.jpg', 
      'https://neychasoto.com/assets/nail-work-gallery.jpg'
    ],
    logo: 'https://neychasoto.com/assets/logo-neychasoto.png',
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
    servesCuisine: 'Beauty Services',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Zelle', 'PayPal'],
    currenciesAccepted: 'USD',
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Wheelchair accessible',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Free parking',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Air conditioning',
        value: true
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Wi-Fi',
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
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Cliente Verificado'
        },
        reviewBody: 'Excelente servicio profesional. Neycha es una artista con las uñas.'
      }
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Onicoplastia Profesional',
          description: 'Tratamiento especializado para hongos y restauración de uñas'
        },
        price: '75.00',
        priceCurrency: 'USD'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Manicura en Gel',
          description: 'Manicura profesional con productos de alta calidad'
        },
        priceRange: '$35-45',
        priceCurrency: 'USD'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Esmaltado en Pies',
          description: 'Servicio completo de pedicura con esmaltado profesional'
        },
        price: '25.00',
        priceCurrency: 'USD'
      }
    ]
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'local-business-schema';
  script.textContent = JSON.stringify(localBusinessData);
  document.head.appendChild(script);
}