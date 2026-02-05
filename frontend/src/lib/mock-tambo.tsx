import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface TamboContextType {
  messages: Message[];
  sendMessage: (message: string) => void;
  isLoading: boolean;
}

const TamboContext = createContext<TamboContextType | undefined>(undefined);

interface TamboProviderProps {
  apiKey: string;
  components: any[];
  config?: {
    systemPrompt?: string;
    model?: string;
  };
  children: ReactNode;
}

export function TamboProvider({ children }: TamboProviderProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = (content: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: `I received your message: "${content}". The Tambo AI integration is being set up. For now, this is a demo response showing that the chat interface is working!`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <TamboContext.Provider value={{ messages, sendMessage, isLoading }}>
      {children}
    </TamboContext.Provider>
  );
}

export function useTambo() {
  const context = useContext(TamboContext);
  if (!context) {
    throw new Error('useTambo must be used within TamboProvider');
  }
  return context;
}
