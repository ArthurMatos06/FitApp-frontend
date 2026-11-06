import { cn } from "@/lib/utils";

export type ConsistencyDayState = "completed" | "started" | "pending";

type ConsistencyDaySquareProps = {
  label: string;
  state: ConsistencyDayState;
  isToday: boolean;
};

const SQUARE_STATE_STYLES: Record<ConsistencyDayState, string> = {
  completed: "bg-primary",
  started: "bg-primary/20",
  pending: "border border-border bg-background",
};

export function ConsistencyDaySquare({
  label,
  state,
  isToday,
}: ConsistencyDaySquareProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={cn(
          "size-5 rounded-[6px]",
          SQUARE_STATE_STYLES[state],
          isToday && "border-[1.6px] border-primary",
        )}
      />
      <span className="text-xs leading-[1.4] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
