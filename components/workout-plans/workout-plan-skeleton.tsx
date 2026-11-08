import { Skeleton } from "@/components/ui/skeleton";

export function WorkoutPlanSkeleton() {
  return (
    <div>
      <header className="flex h-[296px] flex-col justify-between overflow-hidden rounded-b-[20px] bg-muted px-5 pb-11 pt-5">
        <Skeleton className="h-5 w-16 bg-foreground/10" />
        <div className="flex flex-col items-start gap-4">
          <Skeleton className="h-[26px] w-28 rounded-full bg-foreground/10" />
          <Skeleton className="h-[34px] w-48 bg-foreground/10" />
        </div>
      </header>
      <div className="mt-5 flex flex-col gap-3 px-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[200px] w-full rounded-[12px]" />
        ))}
      </div>
    </div>
  );
}
