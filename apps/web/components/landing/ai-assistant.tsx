'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { Button } from '@nexus/ui';
import { cn } from '@/lib/utils';

const suggestions = [
  'Find me a gaming laptop under $1500',
  'What are the best wireless headphones?',
  'Show me trending products',
  'I need a gift for a designer',
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; content: string }[]>([
    {
      role: 'bot',
      content:
        "Hi! I'm your AI shopping assistant. Ask me anything about our products, or tell me what you're looking for!",
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content:
            "I'm still learning about our catalog. In the full version, I'll search our products using AI to find exactly what you need!",
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
          'shadow-glow-primary fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full transition-shadow',
          isOpen ? 'bg-danger shadow-glow-primary' : 'from-primary to-secondary bg-gradient-to-br',
        )}
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
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-border bg-card fixed bottom-24 right-6 z-50 flex w-[380px] flex-col overflow-hidden rounded-2xl border shadow-2xl"
          >
            {/* Header */}
            <div className="border-border from-primary/10 to-secondary/10 flex items-center gap-3 border-b bg-gradient-to-r px-5 py-4">
              <div className="from-primary to-secondary flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI Shopping Assistant</p>
                <p className="text-text-secondary flex items-center gap-1 text-xs">
                  <span className="bg-success inline-block h-2 w-2 rounded-full" />
                  Online — Powered by AI
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ maxHeight: 400 }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface text-text-secondary',
                    )}
                  >
                    {msg.role === 'bot' && (
                      <Sparkles className="text-primary mb-1 inline-block h-3 w-3" />
                    )}
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="border-border flex flex-wrap gap-2 border-t px-4 py-3">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setMessages((prev) => [...prev, { role: 'user', content: s }]);
                      setTimeout(() => {
                        setMessages((prev) => [
                          ...prev,
                          {
                            role: 'bot',
                            content:
                              "Great question! In the full version, I'll search our entire catalog using AI to find the perfect products for you.",
                          },
                        ]);
                      }, 800);
                    }}
                    className="border-border bg-surface text-text-secondary hover:border-primary/30 hover:text-primary rounded-full border px-3 py-1.5 text-xs transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-border flex items-center gap-2 border-t p-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="border-border bg-surface text-text-primary placeholder:text-text-muted focus:border-primary/50 focus:ring-primary/20 flex-1 rounded-xl border px-4 py-2.5 text-sm outline-none transition-all focus:ring-2"
              />
              <Button size="icon" onClick={handleSend} className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
