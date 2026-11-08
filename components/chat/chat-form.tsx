"use client";

import { useState } from "react";
import { ArrowUp, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

type ChatFormProps = {
  isPending: boolean;
  onSend: (message: string) => void;
};

export function ChatForm({ isPending, onSend }: ChatFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = value.trim();
    if (!message || isPending) return;

    onSend(message);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 border-t border-chat-bubble px-5 py-5"
    >
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Digite sua mensagem"
        aria-label="Mensagem"
        className="h-[42px] min-w-0 flex-1 rounded-full bg-chat-bubble px-5 text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
      />
      <Button
        type="submit"
        className="size-[42px] shrink-0 rounded-full bg-chat-user disabled:bg-chat-user disabled:opacity-100"
        disabled={isPending}
        aria-label="Enviar mensagem"
      >
        {isPending ? (
          <LoaderCircle className="size-5 animate-spin" />
        ) : (
          <ArrowUp className="size-6" strokeWidth={2.5} />
        )}
      </Button>
    </form>
  );
}
