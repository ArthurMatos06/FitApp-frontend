import { Suspense } from "react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";
import { getWorkoutPlanById } from "@/app/_lib/api/fetch-generated";
import { Toolbar } from "@/components/home/toolbar";
import { PlanBanner } from "@/components/workout-plans/plan-banner";
import { RestDayCard } from "@/components/workout-plans/rest-day-card";
import { WorkoutDayCard } from "@/components/workout-day-card";

const WEEK_DAY_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

type WorkoutPlanPageParams = {
  params: Promise<{ id: string }>;
};

async function WorkoutPlanContent({ params }: WorkoutPlanPageParams) {
  const { id } = await params;

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const response = await getWorkoutPlanById(id);

  if (response.status === 401) redirect("/auth");
  if (response.status === 404) notFound();
  if (response.status !== 200) {
    throw new Error("Não foi possível carregar o plano de treino.");
  }

  const workoutPlan = response.data;
  const workoutDays = [...workoutPlan.workoutDays].sort(
    (day, otherDay) =>
      (WEEK_DAY_ORDER as readonly string[]).indexOf(day.weekDay) -
      (WEEK_DAY_ORDER as readonly string[]).indexOf(otherDay.weekDay),
  );

  return (
    <>
      <PlanBanner name={workoutPlan.name} />
      <div className="mt-5 flex flex-col gap-3 px-5">
        {workoutDays.map((workoutDay) =>
          workoutDay.isRest ? (
            <RestDayCard key={workoutDay.id} workoutDay={workoutDay} />
          ) : (
            <Link
              key={workoutDay.id}
              href={`/workout-plans/${workoutPlan.id}/days/${workoutDay.id}`}
              aria-label={`Abrir treino de ${workoutDay.name}`}
            >
              <WorkoutDayCard
                workoutDay={{ workoutPlanId: workoutPlan.id, ...workoutDay }}
              />
            </Link>
          ),
        )}
      </div>
    </>
  );
}

export default function WorkoutPlanPage({ params }: WorkoutPlanPageParams) {
  return (
    <main className="min-h-svh pb-[108px] font-heading">
      <Suspense fallback={<p>Carregando...</p>}>
        <WorkoutPlanContent params={params} />
      </Suspense>
      <Suspense fallback={null}>
        <Toolbar activeItem="workouts" />
      </Suspense>
    </main>
  );
}
