"use client";

import { useEffect, useRef } from "react";
import { LoaderCircle } from "lucide-react";
import type { ChatStatus, UIMessage } from "ai";

import { ChatMessage } from "@/components/chat/chat-message";

type ChatMessagesProps = {
  messages: UIMessage[];
  status: ChatStatus;
};

export function ChatMessages({ messages, status }: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  return (
    <div
      ref={containerRef}
      className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-5"
    >
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      {status === "submitted" && (
        <div className="flex h-10 w-[78%] items-center self-start rounded-[20px] bg-chat-bubble px-4 py-3">
          <LoaderCircle className="size-5 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
