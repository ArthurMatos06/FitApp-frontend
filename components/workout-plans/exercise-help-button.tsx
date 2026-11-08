"use client";

import { CircleQuestionMark } from "lucide-react";
import { useQueryStates } from "nuqs";

import { Button } from "@/components/ui/button";
import { chatParams } from "@/components/chat/chat-params";

type ExerciseHelpButtonProps = {
  exerciseName: string;
};

export function ExerciseHelpButton({ exerciseName }: ExerciseHelpButtonProps) {
  const [, setChatParams] = useQueryStates(chatParams);

  return (
    <Button
      variant="ghost"
      className="size-6"
      aria-label="Como executar o exercício"
      onClick={() =>
        setChatParams({
          chat_open: true,
          chat_initial_message: `Como executar o exercício ${exerciseName} corretamente?`,
        })
      }
    >
      <CircleQuestionMark
        className="size-5 text-muted-foreground"
        strokeWidth={1}
      />
    </Button>
  );
}
