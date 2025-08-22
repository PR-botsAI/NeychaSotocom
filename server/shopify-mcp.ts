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
    const systemPrompt = `You are a shopping assistant for Neycha Soto's nail art and onicoplastia store.
    
    Analyze the user's message and determine what action to take. Return a JSON object with:
    {
      "intent": "search_products" | "search_policies" | "general_chat",
      "searchQuery": "query to search if intent is search_products",
      "policyQuery": "query for policies if intent is search_policies",
      "response": "your response in Spanish to the user"
    }
    
    IMPORTANT: Always respond in Spanish. Be friendly and professional.
    - If user asks about products, nail care, or shopping: set intent to "search_products"
    - If user asks about shipping, returns, policies: set intent to "search_policies"
    - Otherwise: set intent to "general_chat" and provide helpful information`;

    // Analyze user intent with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory.slice(-3), // Keep last 3 messages for context
        { role: "user", content: message }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 500
    });

    const aiResponse = JSON.parse(completion.choices[0].message.content || "{}");
    
    let products = null;
    let responseMessage = aiResponse.response || "¿En qué puedo ayudarte hoy?";

    // Handle based on intent
    if (aiResponse.intent === "search_products" && aiResponse.searchQuery) {
      try {
        const searchResult = await searchProducts(aiResponse.searchQuery, message);
        if (searchResult && searchResult.products && searchResult.products.length > 0) {
          products = searchResult.products.slice(0, 3);
          responseMessage = `Encontré estos productos relacionados con tu búsqueda:\n\n`;
          products.forEach((product: any) => {
            responseMessage += `📦 **${product.title}** - ${product.price}\n`;
            if (product.description) {
              responseMessage += `${product.description.substring(0, 80)}...\n`;
            }
            responseMessage += `\n`;
          });
          responseMessage += "Haz clic en cualquier producto para ver más detalles o visita shop.neychasoto.com para ver todo el catálogo.";
        } else {
          responseMessage = "No encontré productos específicos, pero puedes explorar todo nuestro catálogo en shop.neychasoto.com. ¿Hay algo más específico que estés buscando?";
        }
      } catch (error) {
        console.error("Error searching products:", error);
        responseMessage = aiResponse.response || "Puedo ayudarte a encontrar productos de nail art y onicoplastia. Visita shop.neychasoto.com para ver nuestro catálogo completo.";
      }
    } else if (aiResponse.intent === "search_policies" && aiResponse.policyQuery) {
      try {
        const policyResult = await searchPolicies(aiResponse.policyQuery, message);
        if (policyResult && policyResult.answer) {
          responseMessage = policyResult.answer;
        } else {
          responseMessage = aiResponse.response || "Para información sobre políticas específicas, te recomiendo contactar directamente al WhatsApp +1 939-429-0292.";
        }
      } catch (error) {
        console.error("Error searching policies:", error);
        responseMessage = aiResponse.response || "Para consultas sobre políticas y envíos, contáctanos al WhatsApp +1 939-429-0292.";
      }
    }

    return {
      message: responseMessage,
      products: products,
      cartInfo: null,
      cartId: cartId
    };

  } catch (error) {
    console.error("Error processing message:", error);
    return {
      message: "Estoy aquí para ayudarte con productos de nail art y onicoplastia. ¿Qué te gustaría saber sobre nuestros servicios o productos?",
      products: null,
      cartInfo: null,
      cartId
    };
  }
}