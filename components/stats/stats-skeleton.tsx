import { Skeleton } from "@/components/ui/skeleton";

const LABEL_COLUMNS = [0, 3, 6, 9, 12];
const WEEKS = 14;

export function StatsSkeleton() {
  return (
    <div>
      <header className="px-5 pt-5">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="mt-3 h-[210px] w-full rounded-[10px]" />
      </header>
      <section className="px-5 pt-5">
        <Skeleton className="h-6 w-32" />
        <div className="mt-3 rounded-xl border border-border bg-background p-5">
          <div className="grid grid-cols-14 gap-[3px]">
            {LABEL_COLUMNS.map((column) => (
              <Skeleton
                key={column}
                className="h-4 w-12"
                style={{ gridColumn: `${column + 1} / span 3` }}
              />
            ))}
          </div>
          <div className="mt-2 grid grid-cols-14 gap-[3px]">
            {Array.from({ length: WEEKS * 7 }).map((_, index) => (
              <Skeleton
                key={index}
                className="aspect-square w-full rounded-[5px]"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-3 px-5 pt-4">
        <div className="flex gap-3">
          <Skeleton className="h-[130px] flex-1 rounded-xl" />
          <Skeleton className="h-[130px] flex-1 rounded-xl" />
        </div>
        <Skeleton className="h-[130px] rounded-xl" />
      </section>
    </div>
  );
}
