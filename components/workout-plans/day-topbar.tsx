"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

type DayTopbarProps = {
  title: string;
};

export function DayTopbar({ title }: DayTopbarProps) {
  const router = useRouter();

  return (
    <header className="relative flex h-16 items-center px-5">
      <Button
        variant="ghost"
        className="size-6"
        onClick={() => router.back()}
        aria-label="Voltar"
      >
        <ChevronLeft className="size-6 text-foreground" />
      </Button>
      <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold leading-[1.4] text-foreground">
        {title}
      </h1>
    </header>
  );
}
