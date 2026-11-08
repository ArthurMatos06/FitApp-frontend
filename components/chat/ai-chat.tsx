"use client";

import { useEffect, useRef } from "react";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { useQueryStates } from "nuqs";

import { ChatForm } from "@/components/chat/chat-form";
import { ChatHeader } from "@/components/chat/chat-header";
import { chatParams } from "@/components/chat/chat-params";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatSuggestions } from "@/components/chat/chat-suggestions";
import "streamdown/styles.css";

const chatTransport = new DefaultChatTransport({
  api: `${process.env.NEXT_PUBLIC_API_URL}/ai`,
  credentials: "include",
});

export function AiChat() {
  const [{ chat_open: open, chat_initial_message: initialMessage }, setParams] =
    useQueryStates(chatParams);
  const { messages, sendMessage, status, error } = useChat({
    transport: chatTransport,
  });

  const lastInitialMessageRef = useRef<string | null>(null);

  useEffect(() => {
    if (!open) {
      lastInitialMessageRef.current = null;
      return;
    }

    const message = initialMessage.trim();
    if (!message || lastInitialMessageRef.current === message) return;
    if (status === "submitted" || status === "streaming") return;

    lastInitialMessageRef.current = message;
    sendMessage({ text: message });
  }, [open, initialMessage, status, sendMessage]);

  const isPending = status === "submitted" || status === "streaming";

  const closeChat = () =>
    setParams({ chat_open: null, chat_initial_message: null });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-20 bg-black/85 animate-in fade-in duration-200">
      <section
        aria-label="Chat com a FIT.AI"
        className="absolute inset-x-4 top-[85px] bottom-2 flex animate-in fade-in slide-in-from-bottom-4 flex-col overflow-hidden rounded-3xl bg-background duration-200"
      >
        <ChatHeader onClose={closeChat} />
        {error && (
          <p className="bg-destructive/10 px-5 py-2 text-xs text-destructive">
            Não foi possível enviar a mensagem. Tente novamente.
          </p>
        )}
        <ChatMessages messages={messages} status={status} />
        <ChatSuggestions
          onSuggestionClick={(message) => sendMessage({ text: message })}
        />
        <ChatForm
          isPending={isPending}
          onSend={(message) => sendMessage({ text: message })}
        />
      </section>
    </div>
  );
}
