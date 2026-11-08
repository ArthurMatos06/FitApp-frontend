import { Suspense } from "react";
import { headers } from "next/headers";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import dayjs from "dayjs";

import { authClient } from "@/app/_lib/auth-client";
import { getStats, type GetStats200 } from "@/app/_lib/api/fetch-generated";
import { Toolbar } from "@/components/home/toolbar";
import { StreakBanner } from "@/components/stats/streak-banner";
import { StatsSummary } from "@/components/stats/stats-summary";
import { ConsistencyHeatmap } from "@/components/stats/consistency-heatmap";

async function StatsContent() {
  await connection();

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const today = dayjs();
  const currentMonday = today.subtract((today.day() + 6) % 7, "day");

  let stats: GetStats200 | null = null;

  try {
    const response = await getStats({
      from: currentMonday.subtract(13 * 7, "day").format("YYYY-MM-DD"),
      to: today.format("YYYY-MM-DD"),
    });

    if (response.status === 401) redirect("/auth");
    if (response.status === 200) stats = response.data;
  } catch {
    stats = null;
  }

  return (
    <>
      <StreakBanner streak={stats?.workoutStreak ?? 0} />
      <ConsistencyHeatmap
        consistencyByDay={stats?.consistencyByDay ?? {}}
        date={today.format("YYYY-MM-DD")}
      />
      <StatsSummary
        completedWorkoutsCount={stats?.completedWorkoutsCount ?? 0}
        conclusionRate={stats?.conclusionRate ?? 0}
        totalTimeInSeconds={stats?.totalTimeInSeconds ?? 0}
      />
    </>
  );
}

export default function StatsPage() {
  return (
    <main className="min-h-svh pb-[108px] font-heading">
      <Suspense fallback={<p>Carregando...</p>}>
        <StatsContent />
      </Suspense>
      <Suspense fallback={null}>
        <Toolbar activeItem="stats" />
      </Suspense>
    </main>
  );
}
