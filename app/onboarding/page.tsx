import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";
import { fetchTrainReadiness } from "@/app/_lib/train-readiness";
import { CreatePlanButton } from "@/components/onboarding/create-plan-button";
import { OnboardingTopbar } from "@/components/onboarding/onboarding-topbar";
import { OnboardingSkeleton } from "@/components/onboarding/onboarding-skeleton";

async function OnboardingContent() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const { trainData, homeData } = await fetchTrainReadiness();

  if (trainData !== null && homeData.activeWorkoutPlanId !== null) {
    redirect("/");
  }

  const firstName = session.data.user.name?.split(" ")[0]?.trim();

  return (
    <>
      <OnboardingTopbar />
      <section className="flex flex-col gap-3 px-5 pt-8 pb-10">
        <h1 className="text-2xl font-semibold leading-[1.05] text-foreground">
          {firstName ? `Bem-vindo, ${firstName}!` : "Bem-vindo!"}
        </h1>
        <p className="text-sm leading-[1.4] text-muted-foreground">
          Falta só um passo: a nossa IA vai montar um plano de treino
          personalizado para você. Chame a FIT.AI no chat e peça o seu.
        </p>
        <CreatePlanButton />
      </section>
    </>
  );
}

export default function OnboardingPage() {
  return (
    <main className="min-h-svh font-heading">
      <Suspense fallback={<OnboardingSkeleton />}>
        <OnboardingContent />
      </Suspense>
    </main>
  );
}
