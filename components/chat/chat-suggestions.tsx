"use client";

type ChatSuggestionsProps = {
  onSuggestionClick: (message: string) => void;
};

const SUGGESTED_MESSAGES = [
  "Monte meu plano de treino",
  "Alterar plano de treino",
  "Mudar objetivo",
  "Atualizar treino",
];

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {SUGGESTED_MESSAGES.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          onClick={() => onSuggestionClick(suggestion)}
          className="h-[30px] shrink-0 rounded-full bg-chat-chip px-3.5 text-sm text-foreground"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
