import { CircleCheck, CircleSlash, Hourglass, type LucideIcon } from "lucide-react";

import type { GetStats200 } from "@/app/_lib/api/fetch-generated";
import { cn } from "@/lib/utils";

type StatsSummaryProps = {
  completedWorkoutsCount: GetStats200["completedWorkoutsCount"];
  conclusionRate: GetStats200["conclusionRate"];
  totalTimeInSeconds: GetStats200["totalTimeInSeconds"];
};

type StatCardProps = {
  icon: LucideIcon;
  value: string;
  label: string;
  className?: string;
};

function formatTotalTime(totalTimeInSeconds: number): string {
  const hours = Math.floor(totalTimeInSeconds / 3600);
  const minutes = Math.round((totalTimeInSeconds % 3600) / 60);

  return `${hours}h${minutes}m`;
}

function StatCard({ icon: Icon, value, label, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-xl bg-primary/[0.08] p-4",
        className,
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-full bg-primary/15">
        <Icon className="size-4 text-primary" strokeWidth={1.5} />
      </span>
      <span className="text-3xl font-bold leading-none text-foreground">
        {value}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export function StatsSummary({
  completedWorkoutsCount,
  conclusionRate,
  totalTimeInSeconds,
}: StatsSummaryProps) {
  return (
    <section className="flex flex-col gap-3 px-5 pt-4">
      <div className="flex gap-3">
        <StatCard
          icon={CircleCheck}
          value={String(completedWorkoutsCount)}
          label="Treinos Feitos"
          className="flex-1"
        />
        <StatCard
          icon={CircleSlash}
          value={`${Math.round(conclusionRate * 100)}%`}
          label="Taxa de conclusão"
          className="flex-1"
        />
      </div>
      <StatCard
        icon={Hourglass}
        value={formatTotalTime(totalTimeInSeconds)}
        label="Tempo Total"
      />
    </section>
  );
}
