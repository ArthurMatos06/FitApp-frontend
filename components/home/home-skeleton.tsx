import { Skeleton } from "@/components/ui/skeleton";

export function HomeSkeleton() {
  return (
    <div>
      <header className="flex h-[296px] flex-col justify-between gap-2.5 rounded-b-[20px] bg-muted px-5 pb-10 pt-5">
        <Skeleton className="h-5 w-16 bg-foreground/10" />
        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-[34px] w-36 bg-foreground/10" />
            <Skeleton className="h-5 w-28 bg-foreground/10" />
          </div>
          <Skeleton className="h-[30px] w-16 rounded-full bg-foreground/10" />
        </div>
      </header>
      <section className="flex flex-col gap-3 px-5 pt-5">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-stretch gap-3">
          <div className="flex flex-1 items-center justify-between gap-3 rounded-[12px] border border-border px-5 py-5">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-1.5">
                <Skeleton className="size-5 rounded-[6px]" />
                <Skeleton className="h-3.5 w-3" />
              </div>
            ))}
          </div>
          <Skeleton className="w-[72px] rounded-[12px]" />
        </div>
      </section>
      <section className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-[200px] w-full rounded-[12px]" />
      </section>
    </div>
  );
}
