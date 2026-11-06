"use client";

import { useTransition } from "react";

import { startWorkoutSessionAction } from "@/app/workout-plans/[id]/days/[dayid]/actions";
import { Button } from "@/components/ui/button";

type StartWorkoutButtonProps = {
  workoutPlanId: string;
  dayId: string;
};

export function StartWorkoutButton({
  workoutPlanId,
  dayId,
}: StartWorkoutButtonProps) {
  const [isStarting, startStarting] = useTransition();

  const handleStart = () => {
    startStarting(async () => {
      await startWorkoutSessionAction(workoutPlanId, dayId);
    });
  };

  return (
    <Button
      className="absolute bottom-5 right-5 h-[30px] rounded-full px-4 text-base font-semibold"
      onClick={handleStart}
      disabled={isStarting}
    >
      Iniciar Treino
    </Button>
  );
}
