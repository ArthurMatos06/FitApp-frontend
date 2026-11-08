"use client";

import { Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";

type ChatHeaderProps = {
  onClose: () => void;
};

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-2.5 border-b border-chat-bubble py-5 pl-5 pr-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-chat-avatar">
        <Sparkles className="size-5 text-chat-user" />
      </span>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-lg font-semibold leading-none text-foreground">
          Coach AI
        </h2>
        <p className="flex items-center gap-1.5 text-sm leading-none text-chat-user">
          <span className="size-2 rounded-full bg-online" />
          Online
        </p>
      </div>
      <Button
        variant="ghost"
        className="ml-auto size-8 text-muted-foreground"
        onClick={onClose}
        aria-label="Fechar chat"
      >
        <X className="size-6" strokeWidth={1.5} />
      </Button>
    </header>
  );
}
