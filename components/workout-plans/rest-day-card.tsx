import { Calendar, Zap } from "lucide-react";

import type { GetWorkoutPlanById200WorkoutDaysItem } from "@/app/_lib/api/fetch-generated";
import { WEEK_DAY_LABELS } from "@/lib/week-day-labels";

type RestDayCardProps = {
  workoutDay: GetWorkoutPlanById200WorkoutDaysItem;
};

export function RestDayCard({ workoutDay }: RestDayCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-[12px] bg-muted p-5">
      <div className="flex w-fit items-center gap-1 rounded-full bg-foreground/10 px-2.5 py-[5px]">
        <Calendar className="size-3.5 text-primary-foreground" strokeWidth={1} />
        <span className="text-xs font-semibold uppercase leading-none text-primary-foreground">
          {WEEK_DAY_LABELS[workoutDay.weekDay]}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Zap className="size-6 text-primary" strokeWidth={1} />
        <h3 className="text-2xl font-semibold leading-[1.05] text-foreground">
          Descanso
        </h3>
      </div>
    </article>
  );
}
