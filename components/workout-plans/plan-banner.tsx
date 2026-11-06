import Image from "next/image";
import { Target } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type PlanBannerProps = {
  name: string;
};

export function PlanBanner({ name }: PlanBannerProps) {
  return (
    <header className="relative flex h-[296px] flex-col justify-between overflow-hidden rounded-b-[20px] px-5 pb-11 pt-5">
      <Image
        src="/workout-plan-banner.png"
        alt=""
        fill
        preload
        className="object-cover"
      />
      <span className="relative font-anton text-[22px] uppercase leading-[1.15] text-primary-foreground">
        Fit.ai
      </span>
      <div className="relative flex flex-col items-start gap-4">
        <Badge className="h-[26px] gap-1.5 rounded-full px-3 text-xs font-semibold uppercase">
          <Target className="size-3.5!" strokeWidth={1} />
          {name}
        </Badge>
        <h1 className="text-2xl font-semibold leading-[1.05] text-primary-foreground">
          Plano de Treino
        </h1>
      </div>
    </header>
  );
}
