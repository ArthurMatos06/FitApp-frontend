import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ProfileMetricCardProps = {
  icon: LucideIcon;
  value: string;
  label: string;
  className?: string;
};

export function ProfileMetricCard({
  icon: Icon,
  value,
  label,
  className,
}: ProfileMetricCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1 rounded-xl bg-primary/[0.08] p-4",
        className,
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-primary/15">
        <Icon className="size-5 text-primary" strokeWidth={1.5} />
      </span>
      <span className="text-3xl font-bold leading-none text-foreground">
        {value}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
