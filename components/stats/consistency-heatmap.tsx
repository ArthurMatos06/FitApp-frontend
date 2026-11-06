import dayjs from "dayjs";

import type { GetStats200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";
import { cn } from "@/lib/utils";

type ConsistencyHeatmapProps = {
  consistencyByDay: GetStats200ConsistencyByDay;
  date: string;
};

const WEEKS = 14;
const LABEL_COLUMNS = [0, 3, 6, 9, 12];
const MONTH_LABELS = [
  "Jan",
  "Fev",
  "Mar",
  "Abril",
  "Maio",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export function ConsistencyHeatmap({
  consistencyByDay,
  date,
}: ConsistencyHeatmapProps) {
  const today = dayjs(date);
  const gridStart = today
    .subtract((today.day() + 6) % 7, "day")
    .subtract((WEEKS - 1) * 7, "day");

  const cells = Array.from({ length: WEEKS * 7 }, (_, index) => {
    const day = gridStart.add(index, "day");
    const dayConsistency = consistencyByDay[day.format("YYYY-MM-DD")];

    return {
      key: day.format("YYYY-MM-DD"),
      state: dayConsistency?.workoutDayCompleted
        ? "bg-primary"
        : dayConsistency?.workoutDayStarted
          ? "bg-primary/15"
          : "border border-border",
    };
  });

  return (
    <section className="px-5 pt-5">
      <h2 className="text-lg font-semibold leading-[1.4] text-foreground">
        Consistência
      </h2>
      <div className="mt-3 rounded-xl border border-border bg-background p-5">
        <div className="grid grid-cols-14 gap-[3px]">
          {LABEL_COLUMNS.map((column) => {
            const labelDate = gridStart.add(column * 7, "day");

            return (
              <span
                key={column}
                className="text-xs whitespace-nowrap text-muted-foreground"
                style={{ gridColumn: `${column + 1} / span 3` }}
              >
                {MONTH_LABELS[labelDate.month()]}
              </span>
            );
          })}
        </div>
        <div className="mt-2 grid grid-cols-14 gap-[3px]">
          {cells.map((cell) => (
            <div
              key={cell.key}
              className={cn(
                "aspect-square w-full rounded-[5px]",
                cell.state,
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
