import OpenAI from "openai";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// MCP Client setup
let mcpClient: Client | null = null;
const MCP_SERVER_URL = "http://localhost:8000/sse";

async function initializeMCPClient() {
  if (mcpClient) return mcpClient;
  
  try {
    console.log('[MCP Client] Connecting to MCP server...');
    const transport = new SSEClientTransport(new URL(MCP_SERVER_URL));
    mcpClient = new Client(
      {
        name: "neycha-backend",
        version: "1.0.0",
      },
      {
        capabilities: {
          roots: {
            listChanged: true,
          },
          sampling: {},
        },
      }
    );
    
    await mcpClient.connect(transport);
    console.log('[MCP Client] Connected successfully!');
    return mcpClient;
  } catch (error) {
    console.error('[MCP Client] Connection failed:', error);
    throw error;
  }
}

// Convert MCP tools to OpenAI function format
async function getOpenAIToolsFromMCP() {
  const client = await initializeMCPClient();
  
  try {
    const result = await client.listTools();
    const tools = result.tools || [];
    
    return tools.map(tool => ({
      type: 'function' as const,
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.inputSchema || { type: 'object', properties: {} }
      }
    }));
  } catch (error) {
    console.error('[MCP Client] Failed to get tools:', error);
    return [];
  }
}

// Execute MCP tool
async function callMCPTool(name: string, args: any) {
  const client = await initializeMCPClient();
  
  try {
    console.log(`[MCP Client] Calling tool: ${name} with args:`, args);
    const result = await client.callTool({ name, arguments: args });
    console.log(`[MCP Client] Tool result:`, result);
    return result;
  } catch (error) {
    console.error(`[MCP Client] Tool call failed for ${name}:`, error);
    throw error;
  }
}

// Main chat function with MCP integration
export async function processUserMessageWithMCP(
  message: string,
  conversationHistory: any[] = []
) {
  try {
    console.log('[MCP Chat] Processing message:', message);
    
    // Get available tools from MCP server
    const openaiTools = await getOpenAIToolsFromMCP();
    console.log('[MCP Chat] Available tools:', openaiTools.map(t => t.function.name));

    // Build message array with system prompt
    let messages = [
      {
        role: 'system' as const,
        content: `You are Neycha Soto's AI shopping assistant with access to real-time product search and booking tools.

🎯 **Your Mission:** Convert every question into a sale with Neycha's positive vibe!

✨ **Your Personality:**
- Always enthusiastic and helpful: "¡Hola mi amor! 😊"
- Sales-focused but genuine
- Use emojis and positive language
- Match user's language (Spanish/English)

🛠️ **Available Tools:**
- search: Find products, services, or information
- fetch: Get complete product details with pricing

📋 **Key Rules:**
1. **Onicoplastia questions** → Promote SERVICE booking ($75), not products
2. **Product searches** → Use search tool to find real products
3. **Unknown queries** → Use search tool first, then provide helpful response
4. **Always include:** Shop link (https://shop.neychasoto.com), WhatsApp (+1 939-429-0292)
5. **For services:** Booksy link (https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo)

💅 **Remember:** You're selling premium nail care products and professional IBX® certified services!`
      },
      ...conversationHistory.slice(-4), // Keep recent context
      { role: 'user' as const, content: message }
    ];

    // First OpenAI call
    let completion = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages,
      tools: openaiTools.length > 0 ? openaiTools : undefined,
      tool_choice: openaiTools.length > 0 ? 'auto' : undefined,
      temperature: 0.7,
      max_tokens: 1000
    });

    // Tool execution loop
    let toolResults = [];
    let finalResponse = '';

    while (true) {
      const assistantMessage = completion.choices[0].message;

      // Check if assistant wants to use tools
      if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
        console.log('[MCP Chat] Assistant requested tools:', assistantMessage.tool_calls.map(tc => tc.function.name));
        
        // Add assistant message to conversation
        messages.push(assistantMessage);

        // Execute each tool call
        for (const toolCall of assistantMessage.tool_calls) {
          if (toolCall.type !== 'function') continue;
          
          const toolName = toolCall.function.name;
          const toolArgs = safeParse(toolCall.function.arguments);
          
          try {
            const toolResult = await callMCPTool(toolName, toolArgs);
            toolResults.push({ tool: toolName, result: toolResult });
            
            // Add tool result to conversation
            messages.push({
              role: 'tool' as const,
              tool_call_id: toolCall.id,
              content: JSON.stringify(toolResult)
            });
          } catch (error) {
            console.error(`[MCP Chat] Tool execution failed:`, error);
            messages.push({
              role: 'tool' as const,
              tool_call_id: toolCall.id,
              content: JSON.stringify({ error: "Tool execution failed" })
            });
          }
        }

        // Get response after tool execution
        completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages,
          tools: openaiTools.length > 0 ? openaiTools : undefined,
          temperature: 0.7,
          max_tokens: 1000
        });
      } else {
        // No more tool calls, return final response
        finalResponse = assistantMessage.content || '';
        break;
      }
    }

    console.log('[MCP Chat] Final response generated');
    
    return {
      message: finalResponse,
      toolsUsed: toolResults,
      conversationHistory: messages
    };

  } catch (error) {
    console.error('[MCP Chat] Error:', error);
    return {
      message: "¡Hola mi amor! 😊 Disculpa, tuve un problemita técnico. ¿Puedes intentar de nuevo?\n\n🛍️ Mientras tanto, puedes explorar nuestra tienda: https://shop.neychasoto.com\n📱 O escríbeme por WhatsApp: +1 939-429-0292",
      toolsUsed: [],
      conversationHistory: []
    };
  }
}

function safeParse(jsonString: string) {
  try {
    return JSON.parse(jsonString || '{}');
  } catch {
    return {};
  }
}