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
      return 'Neycha Soto | Finally End Nail Fungus Problems Forever | Onicoplastia Hatillo PR';
    case '/onicoplastia':
      return 'Stop Hiding Your Nails | Professional Onicoplastia Treatment | Neycha Soto Hatillo';
    case '/contact':
      return 'Book Your Onicoplastia Consultation | Neycha Soto | Transform Your Nails Today';
    default:
      return 'Neycha Soto | Onicoplastia Specialist | Transform Problem Nails | Hatillo PR';
  }
}

function getPageDescription(location: string): string {
  switch (location) {
    case '/':
      return 'Tired of hiding your nails? Neycha Soto has helped hundreds transform their nail problems with professional onicoplastia. 20+ years experience, IBX® certified. See results in your first session. Book your consultation in Hatillo, PR.';
    case '/onicoplastia':
      return 'Stop letting nail problems control your life. Professional onicoplastia treatment that actually works. Neycha Soto, IBX® certified specialist in Hatillo, PR. Proven results, safe procedure, transform your nails permanently.';
    case '/contact':
      return 'Ready to fix your nail problems for good? Book your onicoplastia consultation with Neycha Soto in Hatillo, Puerto Rico. 20+ years transforming problem nails. Limited appointments available - secure yours today.';
    default:
      return 'Transform your problem nails with proven onicoplastia treatment. Neycha Soto specializes in permanent nail solutions in Hatillo, Puerto Rico. Stop hiding - start living confidently.';
  }
}

function getPageKeywords(location: string): string {
  const baseKeywords = 'Neycha Soto, neychasoto.com, onicoplastia Hatillo Puerto Rico, nail fungus treatment PR, nail problems solution, professional nail restoration, IBX certified specialist, nail transformation Hatillo';
  
  switch (location) {
    case '/':
      return `${baseKeywords}, nail fungus specialist Puerto Rico, permanent nail solution, nail confidence, transform problem nails, professional nail care Hatillo, nail health expert PR`;
    case '/onicoplastia':
      return `onicoplastia treatment Puerto Rico, nail fungus removal Hatillo, nail restoration specialist, professional nail therapy PR, nail health transformation, certified nail treatment, nail problem solution Puerto Rico`;
    case '/contact':
      return `onicoplastia consultation Hatillo, book nail treatment PR, nail specialist appointment, Neycha Soto contact, professional nail consultation Puerto Rico, nail transformation booking`;
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
    { property: 'og:locale:alternate', content: 'en_US' },
    { property: 'og:site_name', content: 'Neycha Soto - Onicoplastia Specialist' },
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
    { name: 'twitter:image:alt', content: 'Professional nail transformation results by Neycha Soto' },
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
      name: 'Professional Onicoplastia Treatment',
      description: 'Specialized nail restoration treatment for fungal infections and damaged nails. Safe, effective procedure performed by IBX® certified specialist.',
      procedureType: 'Therapeutic nail restoration',
      bodyLocation: 'Nails',
      preparation: 'Consultation and nail assessment',
      howPerformed: 'Professional application of specialized products and techniques',
      followup: 'Follow-up appointments to monitor progress',
      provider: {
        '@type': 'Person',
        name: 'Neycha Soto',
        jobTitle: 'Certified Nail Specialist',
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
      name: 'Neycha Soto - Onicoplastia Specialist',
      url: 'https://neychasoto.com',
      description: 'Professional onicoplastia treatment for nail problems. Transform your nails with proven techniques and 20+ years of expertise.',
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
    alternateName: 'Neycha Soto Onicoplastia Specialist',
    image: [
      'https://neychasoto.com/assets/nail-transformation-gallery.jpg',
      'https://neychasoto.com/assets/professional-consultation.jpg'
    ],
    logo: 'https://neychasoto.com/assets/logo-neychasoto.png',
    url: 'https://neychasoto.com',
    telephone: '+1-939-429-0292',
    description: 'Professional onicoplastia specialist helping people transform nail problems permanently. 20+ years experience, IBX® certified, proven results in Hatillo, Puerto Rico.',
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
      name: 'Nail Transformation Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Onicoplastia Treatment',
            description: 'Professional nail restoration and fungus treatment that transforms problem nails permanently'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Nail Health Consultation',
            description: 'Comprehensive assessment and personalized treatment plan for your nail concerns'
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