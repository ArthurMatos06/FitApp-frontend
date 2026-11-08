"use client";

import { useQueryStates } from "nuqs";

import { chatParams } from "@/components/chat/chat-params";
import { Button } from "@/components/ui/button";

export const CREATE_PLAN_INITIAL_MESSAGE = "quero criar um plano de treino";

export function CreatePlanButton() {
  const [, setParams] = useQueryStates(chatParams);

  return (
    <Button
      size="pill"
      className="self-start"
      onClick={() =>
        setParams({
          chat_open: true,
          chat_initial_message: CREATE_PLAN_INITIAL_MESSAGE,
        })
      }
    >
      Quero criar um plano de treino
    </Button>
  );
}
