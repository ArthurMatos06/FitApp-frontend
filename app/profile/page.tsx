import { Suspense } from "react";
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BicepsFlexed, Ruler, Scale, UserRound } from "lucide-react";

import { authClient } from "@/app/_lib/auth-client";
import { ensureOnboardingComplete } from "@/app/_lib/train-readiness";
import { fetchUserTrainData } from "./_lib/fetch-user-train-data";
import { Toolbar } from "@/components/home/toolbar";
import { LogoutButton } from "@/components/profile/logout-button";
import { ProfileMetricCard } from "@/components/profile/profile-metric-card";
import { ProfileSkeleton } from "@/components/profile/profile-skeleton";

async function ProfileContent() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) {
    redirect("/auth");
  }

  await ensureOnboardingComplete();

  const { user } = session.data;

  const trainData = await fetchUserTrainData();

  const metrics = [
    {
      icon: Scale,
      value:
        trainData && trainData.weightInGrams !== 0
          ? (trainData.weightInGrams / 1000).toLocaleString("pt-BR")
          : "-",
      label: "KG",
    },
    {
      icon: Ruler,
      value:
        trainData && trainData.heightInCentimeters !== 0
          ? String(trainData.heightInCentimeters)
          : "-",
      label: "CM",
    },
    {
      icon: BicepsFlexed,
      value:
        trainData && trainData.bodyFatPercentage !== 0
          ? `${trainData.bodyFatPercentage}%`
          : "-",
      label: "GC",
    },
    {
      icon: UserRound,
      value: trainData && trainData.age !== 0 ? String(trainData.age) : "-",
      label: "ANOS",
    },
  ];

  return (
    <>
      <header className="px-5 pt-5">
        <span className="font-anton text-[22px] uppercase leading-[1.15] text-foreground">
          Fit.ai
        </span>
      </header>

      <section className="mt-7 flex items-center gap-3 px-5">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={56}
            height={56}
            className="size-14 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-14 items-center justify-center rounded-full bg-muted">
            <UserRound
              className="size-6 text-muted-foreground"
              strokeWidth={1.5}
            />
          </span>
        )}

        <div className="flex flex-col gap-0.5">
          <h1 className="text-lg font-semibold leading-[1.4] text-foreground">
            {user.name}
          </h1>
          <span className="text-sm leading-[1.4] text-muted-foreground">
            Plano Básico
          </span>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3 px-5">
        {metrics.map((metric) => (
          <ProfileMetricCard key={metric.label} {...metric} />
        ))}
      </section>

      <div className="mt-7">
        <LogoutButton />
      </div>
    </>
  );
}

export default function ProfilePage() {
  return (
    <main className="min-h-svh pb-[108px] font-heading">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
      <Suspense fallback={null}>
        <Toolbar activeItem="profile" />
      </Suspense>
    </main>
  );
}
