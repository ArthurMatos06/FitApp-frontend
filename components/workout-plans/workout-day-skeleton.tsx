import { Skeleton } from "@/components/ui/skeleton";

export function WorkoutDaySkeleton() {
  return (
    <div>
      <header className="relative flex h-16 items-center px-5">
        <Skeleton className="size-6 rounded-md" />
        <Skeleton className="absolute left-1/2 h-5 w-36 -translate-x-1/2" />
      </header>
      <div className="flex flex-col gap-5 px-5">
        <Skeleton className="h-[200px] w-full rounded-[12px]" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-[12px] border border-border bg-background p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="size-6 rounded-full" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="h-[22px] w-20 rounded-full" />
              <Skeleton className="h-[22px] w-16 rounded-full" />
              <Skeleton className="h-[22px] w-14 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
