import dayjs from "dayjs";

import type { GetHomeData200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";
import {
  ConsistencyDaySquare,
  type ConsistencyDayState,
} from "@/components/home/consistency-day-square";
import { SectionHeader } from "@/components/home/section-header";
import { Flame } from "lucide-react";

type ConsistencySectionProps = {
  consistencyByDay: GetHomeData200ConsistencyByDay;
  streak: number;
  date: string;
};

const WEEK_DAY_LABELS = ["S", "T", "Q", "Q", "S", "S", "D"];

export function ConsistencySection({
  consistencyByDay,
  streak,
  date,
}: ConsistencySectionProps) {
  const today = dayjs(date);
  const monday = today.subtract((today.day() + 6) % 7, "day");

  const days = WEEK_DAY_LABELS.map((label, index): {
    key: string;
    label: string;
    state: ConsistencyDayState;
    isToday: boolean;
  } => {
    const day = monday.add(index, "day");
    const dayKey = day.format("YYYY-MM-DD");
    const dayConsistency = consistencyByDay[dayKey];
    const state = dayConsistency?.workoutDayCompleted
      ? "completed"
      : dayConsistency?.workoutDayStarted
        ? "started"
        : "pending";

    return {
      key: dayKey,
      label,
      state,
      isToday: day.isSame(today, "day"),
    };
  });

  return (
    <section className="flex flex-col gap-3 px-5 pt-5">
      <SectionHeader title="Consistência" actionLabel="Ver histórico" />
      <div className="flex items-stretch gap-3">
        <div className="flex flex-1 items-center justify-between gap-3 rounded-[12px] border border-border px-5 py-5">
          {days.map((day) => (
            <ConsistencyDaySquare
              key={day.key}
              label={day.label}
              state={day.state}
              isToday={day.isToday}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-[12px] bg-streak-foreground/10 px-5 py-2">
          <Flame
            className="size-4 text-streak-foreground"
            fill="currentColor"
          />
          <span className="text-base font-semibold leading-[1.15] text-foreground">
            {streak}
          </span>
        </div>
      </div>
    </section>
  );
}
