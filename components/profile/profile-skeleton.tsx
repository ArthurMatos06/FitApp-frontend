import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div>
      <header className="px-5 pt-5">
        <Skeleton className="h-6 w-16" />
      </header>
      <section className="mt-7 flex items-center gap-3 px-5">
        <Skeleton className="size-14 rounded-full" />
        <div className="flex flex-col gap-0.5">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-20" />
        </div>
      </section>
      <section className="mt-5 grid grid-cols-2 gap-3 px-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[134px] rounded-xl" />
        ))}
      </section>
      <div className="mt-7 flex justify-center">
        <Skeleton className="h-8 w-36 rounded-md" />
      </div>
    </div>
  );
}
