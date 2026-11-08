import { Zap } from "lucide-react";

import type { GetWorkoutDay200ExercisesItem } from "@/app/_lib/api/fetch-generated";
import { ExerciseHelpButton } from "@/components/workout-plans/exercise-help-button";

type ExerciseCardProps = {
  exercise: GetWorkoutDay200ExercisesItem;
};

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <article className="flex flex-col gap-2 rounded-[12px] border border-border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold leading-[1.4] text-foreground">
          {exercise.name}
        </h3>
        <ExerciseHelpButton exerciseName={exercise.name} />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="flex h-[22px] items-center rounded-full bg-muted px-3 text-xs font-semibold uppercase leading-none text-muted-foreground">
          {exercise.sets} séries
        </span>
        <span className="flex h-[22px] items-center rounded-full bg-muted px-3 text-xs font-semibold uppercase leading-none text-muted-foreground">
          {exercise.reps} reps
        </span>
        <span className="flex h-[22px] items-center gap-1 rounded-full bg-muted px-3 text-xs font-semibold uppercase leading-none text-muted-foreground">
          <Zap className="size-3.5" strokeWidth={1} />
          {exercise.restTimeInSeconds}s
        </span>
      </div>
    </article>
  );
}
