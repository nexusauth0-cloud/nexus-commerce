"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  Zap,
} from "lucide-react";
import { Button } from "@nexus/ui/button";
import { Glass } from "@nexus/ui/glass";
import { cn } from "@/lib/utils";

const suggestions = [
  "Find me a gaming laptop under $1500",
  "What are the best wireless headphones?",
  "Show me trending products in 2026",
  "I need a gift for a UX designer",
];

const quickActions = [
  { label: "Track Order", icon: Zap },
  { label: "Get Help", icon: MessageCircle },
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "bot" | "user"; content: string }[]
  >([
    {
      role: "bot",
      content:
        "Hi! I'm your AI shopping assistant. Ask me anything about our products, or tell me what you're looking for!",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "I'm analyzing our catalog... In the full version, I'll search millions of products using AI to find exactly what you need!",
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* FAB Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-glow-primary transition-shadow",
          isOpen
            ? "bg-danger"
            : "bg-gradient-to-br from-primary to-secondary",
        )}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[380px]"
          >
            <Glass variant="elevated" className="overflow-hidden p-0">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10 px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    AI Shopping Assistant
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <span className="inline-block h-2 w-2 rounded-full bg-success" />
                    Online — Powered by OpenAI
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div
                className="space-y-4 overflow-y-auto p-4"
                style={{ maxHeight: 340 }}
              >
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={cn(
                      "flex",
                      msg.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-surface text-text-secondary",
                      )}
                    >
                      {msg.role === "bot" && (
                        <Sparkles className="mb-1 inline-block h-3 w-3 text-primary" />
                      )}
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Suggestions + Quick actions */}
              {messages.length === 1 && (
                <div className="space-y-2 border-t border-border px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setMessages((prev) => [
                            ...prev,
                            { role: "user", content: s },
                          ]);
                          setTimeout(() => {
                            setMessages((prev) => [
                              ...prev,
                              {
                                role: "bot",
                                content:
                                  "Great question! In the full version, I'll search our entire catalog using AI to find the perfect products for you.",
                              },
                            ]);
                          }, 800);
                        }}
                        className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary transition-all hover:border-primary/30 hover:text-primary"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.label}
                        className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary transition-all hover:border-primary/30 hover:text-primary"
                      >
                        <action.icon className="h-3 w-3" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="flex items-center gap-2 border-t border-border p-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  aria-label="Chat input"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  className="shrink-0"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Glass>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}