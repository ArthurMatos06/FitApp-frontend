"use client";

import { Sparkles } from "lucide-react";
import { useQueryStates } from "nuqs";

import { Button } from "@/components/ui/button";
import { chatParams } from "@/components/chat/chat-params";

export function AiChatButton() {
  const [, setChatParams] = useQueryStates(chatParams);

  return (
    <Button
      className="size-14 rounded-full"
      aria-label="Abrir chat com a FIT.AI"
      onClick={() =>
        setChatParams({ chat_open: true, chat_initial_message: null })
      }
    >
      <Sparkles className="size-6 text-primary-foreground" />
    </Button>
  );
}
