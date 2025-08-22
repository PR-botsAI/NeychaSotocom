import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Shopify MCP Server endpoint
const SHOP_DOMAIN = "shop.neychasoto.com";
const MCP_ENDPOINT = `https://${SHOP_DOMAIN}/api/mcp`;

interface MCPRequest {
  jsonrpc: string;
  method: string;
  id: number;
  params: {
    name: string;
    arguments: any;
  };
}

interface MCPResponse {
  jsonrpc: string;
  id: number;
  result?: any;
  error?: {
    code: number;
    message: string;
  };
}

// Call the Shopify MCP server
async function callMCPServer(toolName: string, args: any): Promise<any> {
  const request: MCPRequest = {
    jsonrpc: "2.0",
    method: "tools/call",
    id: Date.now(),
    params: {
      name: toolName,
      arguments: args
    }
  };

  try {
    const response = await fetch(MCP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`MCP server error: ${response.status}`);
    }

    const data: MCPResponse = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.result;
  } catch (error) {
    console.error("MCP Server error:", error);
    throw error;
  }
}

// Search products in the shop catalog
export async function searchProducts(query: string, context: string = "") {
  try {
    const result = await callMCPServer("search_shop_catalog", {
      query,
      context: context || "Customer looking for products"
    });
    return result;
  } catch (error) {
    console.error("Error searching products:", error);
    return null;
  }
}

// Search shop policies and FAQs
export async function searchPolicies(query: string, context: string = "") {
  try {
    const result = await callMCPServer("search_shop_policies_and_faqs", {
      query,
      context
    });
    return result;
  } catch (error) {
    console.error("Error searching policies:", error);
    return null;
  }
}

// Get cart contents
export async function getCart(cartId: string) {
  try {
    const result = await callMCPServer("get_cart", {
      cart_id: cartId
    });
    return result;
  } catch (error) {
    console.error("Error getting cart:", error);
    return null;
  }
}

// Update cart (add/remove items)
export async function updateCart(cartId: string | null, lines: any[]) {
  try {
    const args: any = { lines };
    if (cartId) {
      args.cart_id = cartId;
    }
    
    const result = await callMCPServer("update_cart", args);
    return result;
  } catch (error) {
    console.error("Error updating cart:", error);
    return null;
  }
}

// Process user message with OpenAI
export async function processUserMessage(
  message: string,
  conversationHistory: any[],
  cartId: string | null
) {
  try {
    const systemPrompt = `You are Neycha Soto's nail care assistant. You help customers with:
    1. Onicoplastia treatment for nail fungus problems
    2. General nail care services and advice
    3. Booking appointments 
    4. Product recommendations from the shop
    
    Respond in JSON format:
    {
      "intent": "nail_care_advice" | "search_products" | "booking_help" | "general_chat",
      "searchQuery": "product search terms if needed",
      "response": "helpful response in Spanish"
    }
    
    For nail problems like "hongos" or "cutícula":
    - Recommend onicoplastia treatment
    - Suggest booking evaluation
    - Mention professional services
    
    For products: Try searching the shop catalog`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory.slice(-3),
        { role: "user", content: message }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 500
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content || "{}");
    let products = null;
    let responseMessage = aiResponse.response;

    // Handle nail care advice and booking
    if (aiResponse.intent === "nail_care_advice" || message.toLowerCase().includes("hongos") || message.toLowerCase().includes("hongo")) {
      responseMessage = `Para problemas de hongos en las uñas, te recomiendo nuestro tratamiento de **Onicoplastia**:

✨ **Beneficios del tratamiento:**
• Elimina hongos de forma segura y eficaz
• Mejora visible desde la primera sesión  
• Procedimiento indoloro y no invasivo
• Compatible con decoraciones

📅 **¿Cómo empezar?**
Necesitas una evaluación inicial para determinar el mejor plan de tratamiento.

💰 **Precios:**
• Primera cita (evaluación): $75
• Seguimientos: $40-$50

🔗 **Reserva tu cita:** https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo

📱 **WhatsApp:** +1 939-429-0292 (envía fotos de las uñas afectadas para evaluación)`;
    }
    // Handle product searches  
    else if (aiResponse.intent === "search_products" && aiResponse.searchQuery) {
      try {
        const searchResult = await searchProducts(aiResponse.searchQuery, message);
        if (searchResult && searchResult.products && searchResult.products.length > 0) {
          products = searchResult.products.slice(0, 3);
          responseMessage = `Encontré estos productos en nuestra tienda:\n\n`;
          products.forEach((product: any) => {
            responseMessage += `🛍️ **${product.title}** - ${product.price}\n`;
            if (product.description) {
              responseMessage += `${product.description.substring(0, 100)}...\n`;
            }
            responseMessage += `\n`;
          });
          responseMessage += "\n🛒 **Visita nuestra tienda completa:** https://shop.neychasoto.com";
        } else {
          responseMessage = `No encontré productos específicos con "${aiResponse.searchQuery}", pero tenemos muchos productos profesionales en nuestra tienda.

🛒 **Explora nuestro catálogo completo:** https://shop.neychasoto.com

💬 **¿Buscas algo específico?** Puedes ser más detallado y te ayudo mejor.`;
        }
      } catch (error) {
        console.error("Error searching products:", error);
        responseMessage = `Puedo ayudarte a encontrar productos de nail art y cuidado de uñas.

🛒 **Nuestra tienda:** https://shop.neychasoto.com
💬 **WhatsApp:** +1 939-429-0292`;
      }
    }
    // Handle booking help
    else if (aiResponse.intent === "booking_help") {
      responseMessage = `📅 **Para agendar tu cita:**

🔗 **Booksy:** https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo

📍 **Ubicación:** 166 Avenida Dr Susoni, Unit 166, Hatillo, PR 00659

📱 **WhatsApp:** +1 939-429-0292

⭐ **Servicios populares:**
• Onicoplastia (hongos) - $75 primera cita
• Manicura en Gel - $35-$45
• Esmaltado en Pies - $25+

¿Qué servicio te interesa?`;
    }

    return {
      message: responseMessage || "¡Hola! Soy tu asistente virtual de Neycha Nails. ¿En qué puedo ayudarte? 💅✨",
      products: products,
      cartInfo: null,
      cartId: cartId
    };

  } catch (error) {
    console.error("Error processing message:", error);
    return {
      message: "¡Hola! Puedo ayudarte con:\n\n💅 Tratamientos de onicoplastia\n🛍️ Productos de la tienda\n📅 Agendar citas\n\n¿Qué te interesa?",
      products: null,
      cartInfo: null,
      cartId
    };
  }
}