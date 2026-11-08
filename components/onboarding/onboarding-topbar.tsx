import Link from "next/link";

import { FitAILogo } from "@/components/fitai-logo";
import { Button } from "@/components/ui/button";

export function OnboardingTopbar() {
  return (
    <header className="flex items-center justify-between px-5 pt-5">
      <FitAILogo className="h-6 text-foreground" />
      <Button size="pill" render={<Link href="/" />}>
        Acessar FIT.AI
      </Button>
    </header>
  );
}
