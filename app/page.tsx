import { Suspense } from "react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import dayjs from "dayjs";

import { authClient } from "@/app/_lib/auth-client";
import { getHomeData } from "./_lib/api/fetch-generated";
import { ConsistencySection } from "@/components/home/consistency-section";
import { HomeBanner } from "@/components/home/home-banner";
import { SectionHeader } from "@/components/home/section-header";
import { Toolbar } from "@/components/home/toolbar";
import { WorkoutDayCard } from "@/components/workout-day-card";

async function HomeContent() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const today = dayjs().format("YYYY-MM-DD");
  const response = await getHomeData(today);

  if (response.status === 401) redirect("/auth");
  if (response.status !== 200) {
    throw new Error("Não foi possível carregar os dados da home.");
  }

  const homeData = response.data;

  return (
    <>
      <HomeBanner name={session.data.user.name} />
      <ConsistencySection
        consistencyByDay={homeData.consistencyByDay}
        streak={homeData.workoutStreak}
        date={today}
      />
      <section className="flex flex-col gap-3 p-5">
        <SectionHeader title="Treino de Hoje" actionLabel="Ver treinos" />
        {homeData.todayWorkoutDay && (
          <Link
            href={`/workout-plans/${homeData.todayWorkoutDay.workoutPlanId}/days/${homeData.todayWorkoutDay.id}`}
            aria-label="Abrir treino de hoje"
          >
            <WorkoutDayCard workoutDay={homeData.todayWorkoutDay} />
          </Link>
        )}
      </section>
    </>
  );
}

export default function Home() {
  return (
    <main className="min-h-svh pb-[125px] font-heading">
      <Suspense fallback={<p>Carregando...</p>}>
        <HomeContent />
      </Suspense>
      <Suspense fallback={null}>
        <Toolbar />
      </Suspense>
    </main>
  );
}
