// Direct product search implementation - no MCP complexity
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Real product database
const PRODUCTS = [
  {
    id: "nano-glass-file",
    title: "Lima de Vidrio Nano Profesional",
    description: "Lima de vidrio nanotecnológica para acabado perfecto. Ideal para técnicos profesionales.",
    price: "$25.99",
    category: "herramientas",
    availability: "En stock",
    keywords: ["lima", "nano", "glass", "vidrio", "file", "profesional"]
  },
  {
    id: "glass-nail-file-set",
    title: "Set de Limas de Cristal Premium (3 piezas)",
    description: "Conjunto de 3 limas de cristal de diferentes granos para manicura profesional.",
    price: "$45.99",
    category: "herramientas",
    availability: "En stock",
    keywords: ["lima", "cristal", "glass", "set", "premium", "nail file"]
  },
  {
    id: "nano-buffer-block",
    title: "Bloque Pulidor Nano 4 Caras",
    description: "Bloque pulidor con tecnología nano para brillo espejo sin productos químicos.",
    price: "$15.99",
    category: "herramientas",
    availability: "En stock",
    keywords: ["nano", "buffer", "pulidor", "bloque", "brillo"]
  },
  {
    id: "ibx-treatment-kit",
    title: "Kit de Tratamiento IBX® Profesional",
    description: "Kit completo para tratamiento de fortalecimiento de uñas IBX®.",
    price: "$89.99",
    category: "tratamientos",
    availability: "En stock",
    keywords: ["ibx", "tratamiento", "kit", "fortalecimiento", "profesional"]
  },
  {
    id: "cuticle-oil",
    title: "Aceite de Cutícula Premium con Vitamina E",
    description: "Aceite nutritivo para cutículas con vitamina E y aceites esenciales.",
    price: "$18.99",
    category: "cuidado",
    availability: "En stock",
    keywords: ["aceite", "cuticula", "vitamina", "oil", "premium"]
  }
];

// Search products
function searchProducts(query: string): any[] {
  const searchTerms = query.toLowerCase().split(' ');
  
  const results = PRODUCTS.filter(product => {
    const productText = `${product.title} ${product.description} ${product.keywords.join(' ')}`.toLowerCase();
    return searchTerms.some(term => productText.includes(term));
  }).map(product => ({
    ...product,
    relevance: searchTerms.filter(term => 
      product.keywords.some(keyword => keyword.includes(term))
    ).length
  })).sort((a, b) => b.relevance - a.relevance);
  
  return results.slice(0, 5);
}

// Process message with real product search
export async function processSmartMessage(
  message: string,
  conversationHistory: any[] = []
) {
  try {
    const searchTerms = message.toLowerCase();
    
    // Check for onicoplastia/hongos
    if (searchTerms.includes('onicoplastia') || searchTerms.includes('hongo')) {
      return {
        message: `¡Hola mi amor! 😊 ¿Buscas tratamiento para hongos? 

**Te recomiendo nuestro SERVICIO PROFESIONAL de Onicoplastia:**

✨ **Tratamiento IBX® Certificado**
• Primera evaluación: $75
• Seguimientos: $40-$50
• Resultados desde la 1ra sesión

📅 **Agenda aquí:** https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo

🛍️ **¿Prefieres productos?** https://shop.neychasoto.com

📱 **WhatsApp:** +1 939-429-0292

¿Te agendo una evaluación? Es mucho más efectivo que productos caseros! 💅`,
        products: []
      };
    }
    
    // Search for products
    const products = searchProducts(message);
    
    if (products.length > 0) {
      let response = `¡Perfecto mi amor! 😊 Encontré estos productos para ti:\n\n`;
      
      products.forEach((product, index) => {
        response += `**${index + 1}. ${product.title}**\n`;
        response += `${product.description}\n`;
        response += `💰 **Precio:** ${product.price} - ${product.availability}\n\n`;
      });
      
      response += `🛍️ **Ver más en nuestra tienda:** https://shop.neychasoto.com\n`;
      response += `📱 **¿Dudas?** WhatsApp: +1 939-429-0292\n\n`;
      response += `¿Te interesa alguno de estos productos? 💅✨`;
      
      return { message: response, products };
    }
    
    // Use AI for general queries
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Eres el asistente de ventas de Neycha Soto. Sé entusiasta y útil.
          Siempre incluye:
          - Tienda: https://shop.neychasoto.com
          - WhatsApp: +1 939-429-0292
          - Booksy para citas: https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo
          Usa emojis y sé positiva! 💅✨`
        },
        ...conversationHistory.slice(-2),
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    return {
      message: completion.choices[0].message.content || "¡Hola! ¿En qué puedo ayudarte?",
      products: []
    };
    
  } catch (error) {
    console.error("Error in smart message processing:", error);
    return {
      message: `¡Hola mi amor! 😊 Visita nuestra tienda para ver todos los productos:\n\n🛍️ https://shop.neychasoto.com\n📱 WhatsApp: +1 939-429-0292`,
      products: []
    };
  }
}