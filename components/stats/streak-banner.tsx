import Image from "next/image";
import { Flame } from "lucide-react";

import { cn } from "@/lib/utils";

type StreakBannerProps = {
  streak: number;
};

export function StreakBanner({ streak }: StreakBannerProps) {
  return (
    <header className="px-5 pt-5">
      <span className="font-anton text-[22px] uppercase leading-[1.15] text-foreground">
        Fit.ai
      </span>
      <div
        className={cn(
          "relative mt-3 flex h-[210px] flex-col items-center justify-center gap-2 overflow-hidden rounded-[10px]",
        )}
      >
        <Image
          src="/stats-banner.png"
          alt=""
          fill
          preload
          className={cn("object-cover", streak === 0 && "grayscale")}
        />
        <span className="relative flex size-14 items-center justify-center rounded-full bg-primary-foreground/10">
          <Flame
            className="size-7 text-streak-foreground"
            fill="currentColor"
            strokeWidth={1}
          />
        </span>
        <span className="relative text-[44px] font-bold leading-none text-primary-foreground">
          {streak} {streak === 1 ? "dia" : "dias"}
        </span>
        <span className="relative text-base text-primary-foreground/60">
          Sequência Atual
        </span>
      </div>
    </header>
  );
}
