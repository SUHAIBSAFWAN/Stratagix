'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  // Replace with your actual Zapier chatbot embed URL
  const zapierChatbotUrl = 'https://interfaces.zapier.com/embed/chatbot/cmb24hcmn006ksa3jczsauhon';

  return (
    <>
      {/* Floating Chatbot Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 flex items-center justify-center shadow-lg bg-primary hover:bg-primary/90 z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        )}
      </Button>

      {/* Chatbot Frame */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-[500px] h-[500px] bg-background border rounded-lg shadow-lg z-40"
          aria-label="Chatbot frame"
        >
          <div className="relative w-full h-full">
            <iframe
              src={zapierChatbotUrl}
              title="Zapier Chatbot"
              className="w-full h-full border-0 rounded-lg"
              allow="microphone; camera"
            />
          </div>
        </div>
      )}
    </>
  );
}