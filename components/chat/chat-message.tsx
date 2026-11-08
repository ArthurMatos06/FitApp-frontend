"use client";

import { Streamdown } from "streamdown";
import type { UIMessage } from "ai";

import { ChatVideoLink, getYouTubeId } from "@/components/chat/chat-video-link";
import { cn } from "@/lib/utils";

type ChatMessageProps = {
  message: UIMessage;
};

const getMessageText = (message: UIMessage): string =>
  message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "max-w-[78%] rounded-[20px] bg-chat-bubble px-4 py-3 text-[15px] leading-relaxed text-foreground",
        isUser
          ? "self-end bg-chat-user text-white"
          : "self-start [&_a]:font-medium [&_a]:text-chat-user",
      )}
    >
      {isUser ? (
        <p className="whitespace-pre-wrap">{getMessageText(message)}</p>
      ) : (
        <Streamdown
          components={{
            a: ({ href, children }) => {
              if (href && getYouTubeId(href)) {
                return <ChatVideoLink href={href} />;
              }
              return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              );
            },
          }}
        >
          {getMessageText(message)}
        </Streamdown>
      )}
    </div>
  );
}
