import Image from "next/image";

import { Badge } from "@/components/ui/badge";

type HomeBannerProps = {
  name?: string | null;
};

export function HomeBanner({ name }: HomeBannerProps) {
  const firstName = name?.split(" ")[0]?.trim();

  return (
    <header className="relative flex h-[296px] flex-col justify-between gap-2.5 overflow-hidden rounded-b-[20px] px-5 pb-10 pt-5">
      <Image
        src="/home-banner.jpg"
        alt=""
        fill
        preload
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(230deg,transparent_0%,black_100%)]"
      />
      <span className="relative font-anton text-[22px] uppercase leading-[1.15] text-primary-foreground">
        Fit.ai
      </span>
      <div className="relative flex items-end justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-semibold leading-[1.05] text-primary-foreground">
            {firstName ? `Olá, ${firstName}` : "Olá!"}
          </h1>
          <p className="text-sm leading-[1.15] text-primary-foreground/70">
            Bora treinar hoje?
          </p>
        </div>
        <Badge className="h-[30px] rounded-full px-4 text-sm font-semibold">
          Bora!
        </Badge>
      </div>
    </header>
  );
}
