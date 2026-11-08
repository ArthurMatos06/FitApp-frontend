import { Skeleton } from "@/components/ui/skeleton";

export function OnboardingSkeleton() {
  return (
    <div>
      <header className="flex items-center justify-between px-5 pt-5">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-[38px] w-32 rounded-full" />
      </header>
      <section className="flex flex-col gap-3 px-5 pt-8 pb-10">
        <Skeleton className="h-[34px] w-52" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
        <Skeleton className="h-[38px] w-64 self-start rounded-full" />
      </section>
    </div>
  );
}
