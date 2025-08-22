import { useState, useRef, useEffect } from "react";
import { Send, ShoppingBag, X, Sparkles, Loader2, Package, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  products?: any[];
  cartInfo?: any;
}

interface ShopAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShopAssistant({ isOpen, onClose }: ShopAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "¡Hola! Soy tu asistente de compras virtual. Puedo ayudarte a encontrar productos, responder preguntas sobre nuestras políticas, y gestionar tu carrito. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/shop-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          cartId,
          conversationHistory: messages.slice(-5).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
        products: data.products,
        cartInfo: data.cartInfo
      };

      if (data.cartId) {
        setCartId(data.cartId);
      }

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "No pude procesar tu mensaje. Por favor, intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "¿Qué productos tienen para onicoplastia?",
    "¿Cuál es su política de envío?",
    "Busco esmaltes IBX certificados",
    "¿Tienen kits profesionales?"
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]"
      >
        <Card className="bg-zinc-900 border-purple-600/30 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <ShoppingBag className="h-5 w-5 text-purple-400" />
                  <Sparkles className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />
                </div>
                <CardTitle className="text-white text-lg">Asistente de Compras</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-96 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-purple-600 text-white"
                          : "bg-zinc-800 text-gray-100"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      
                      {message.products && message.products.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.products.map((product, idx) => (
                            <a
                              key={idx}
                              href={product.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-2 bg-zinc-700/50 rounded hover:bg-zinc-700 transition-colors"
                            >
                              <div className="flex items-start gap-2">
                                <Package className="h-4 w-4 text-purple-400 mt-0.5" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{product.name}</p>
                                  <p className="text-xs text-gray-400">{product.price}</p>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}

                      {message.cartInfo && (
                        <div className="mt-3 p-2 bg-green-900/30 rounded">
                          <p className="text-xs text-green-400">
                            Carrito actualizado • {message.cartInfo.totalItems} items
                          </p>
                          {message.cartInfo.checkoutUrl && (
                            <a
                              href={message.cartInfo.checkoutUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-green-300 hover:text-green-200 underline"
                            >
                              Proceder al checkout →
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 rounded-lg p-3">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-400 mb-2">Preguntas sugeridas:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs bg-zinc-800 border-zinc-700 text-gray-300 hover:bg-zinc-700 hover:text-white"
                    >
                      <HelpCircle className="h-3 w-3 mr-1" />
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t border-zinc-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  disabled={isLoading}
                  className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-400"
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}