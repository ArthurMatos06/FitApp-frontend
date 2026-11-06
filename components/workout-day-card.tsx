import Image from "next/image";
import { Calendar, Dumbbell, Timer } from "lucide-react";

import type { GetHomeData200TodayWorkoutDay } from "@/app/_lib/api/fetch-generated";
import { WEEK_DAY_LABELS } from "@/lib/week-day-labels";

type WorkoutDayCardProps = {
  workoutDay: GetHomeData200TodayWorkoutDay;
};

export function WorkoutDayCard({ workoutDay }: WorkoutDayCardProps) {
  const durationInMinutes = Math.round(
    workoutDay.estimatedDurationInSeconds / 60,
  );

  return (
    <article className="relative h-[200px] w-full overflow-hidden rounded-[12px]">
      <Image
        src={workoutDay.coverImageUrl || "/workout-plan-banner.png"}
        alt=""
        fill
        className="object-cover"
      />
      <div className="relative flex h-full flex-col justify-between gap-2.5 p-5">
        <div className="flex w-fit items-center gap-1 rounded-full bg-primary-foreground/15 px-2.5 py-[5px] backdrop-blur">
          <Calendar
            className="size-3.5 text-primary-foreground"
            strokeWidth={1}
          />
          <span className="text-xs font-semibold uppercase leading-none text-primary-foreground">
            {WEEK_DAY_LABELS[workoutDay.weekDay]}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold leading-[1.05] text-primary-foreground">
            {workoutDay.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Timer
                className="size-3.5 text-primary-foreground/70"
                strokeWidth={1}
              />
              <span className="text-xs leading-[1.4] text-primary-foreground/70">
                {durationInMinutes}min
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Dumbbell
                className="size-3.5 text-primary-foreground/70"
                strokeWidth={1}
              />
              <span className="text-xs leading-[1.4] text-primary-foreground/70">
                {workoutDay.exercisesCount} exercícios
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
