"use client";

import { useState, useTransition } from "react";

import { completeWorkoutSessionAction } from "@/app/workout-plans/[id]/days/[dayid]/actions";
import { Button } from "@/components/ui/button";

type CompleteWorkoutButtonProps = {
  workoutPlanId: string;
  dayId: string;
  sessionId: string;
};

const ERROR_MESSAGES: Record<number, string> = {
  400: "Não foi possível concluir o treino. Tente novamente.",
  401: "Sua sessão expirou. Recarregue a página.",
  404: "Sessão de treino não encontrada.",
  500: "Erro no servidor. Tente novamente.",
};

export function CompleteWorkoutButton({
  workoutPlanId,
  dayId,
  sessionId,
}: CompleteWorkoutButtonProps) {
  const [isCompleting, startCompleting] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleComplete = () => {
    setError(null);

    startCompleting(async () => {
      const result = await completeWorkoutSessionAction(
        workoutPlanId,
        dayId,
        sessionId,
      );

      if (result.status !== 200) {
        setError(
          ERROR_MESSAGES[result.status] ??
            "Não foi possível concluir o treino. Tente novamente.",
        );
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        className="h-[38px] w-full rounded-full text-base font-semibold"
        onClick={handleComplete}
        disabled={isCompleting}
      >
        Marcar como concluído
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
