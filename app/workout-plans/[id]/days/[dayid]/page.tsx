import { Suspense } from "react";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import dayjs from "dayjs";

import { authClient } from "@/app/_lib/auth-client";
import { getWorkoutDay } from "@/app/_lib/api/fetch-generated";
import { Toolbar } from "@/components/home/toolbar";
import { CompleteWorkoutButton } from "@/components/workout-plans/complete-workout-button";
import { DayTopbar } from "@/components/workout-plans/day-topbar";
import { ExerciseCard } from "@/components/workout-plans/exercise-card";
import { StartWorkoutButton } from "@/components/workout-plans/start-workout-button";
import { WorkoutDayCard } from "@/components/workout-day-card";
import { Button } from "@/components/ui/button";
import { WEEK_DAY_LABELS } from "@/lib/week-day-labels";

const WEEK_DAY_BY_DAY_OF_WEEK = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

type WorkoutDayPageParams = {
  params: Promise<{ id: string; dayid: string }>;
};

async function WorkoutDayContent({ params }: WorkoutDayPageParams) {
  const { id, dayid } = await params;

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const response = await getWorkoutDay(id, dayid);

  if (response.status === 401) redirect("/auth");
  if (response.status === 404) notFound();
  if (response.status !== 200) {
    throw new Error("Não foi possível carregar o treino.");
  }

  const workoutDay = response.data;
  const hasCompletedSession = workoutDay.sessions.some(
    (workoutSession) => workoutSession.completedAt,
  );
  const inProgressSession = workoutDay.sessions.find(
    (workoutSession) => !workoutSession.completedAt,
  );
  const isToday =
    WEEK_DAY_BY_DAY_OF_WEEK[dayjs().day()] === workoutDay.weekDay;
  const title = isToday ? "Treino de Hoje" : WEEK_DAY_LABELS[workoutDay.weekDay];

  const heroWorkoutDay = {
    workoutPlanId: id,
    id: workoutDay.id,
    name: workoutDay.name,
    isRest: workoutDay.isRest,
    weekDay: workoutDay.weekDay,
    estimatedDurationInSeconds: workoutDay.estimatedDurationInSeconds,
    coverImageUrl: workoutDay.coverImageUrl,
    exercisesCount: workoutDay.exercises.length,
  };

  return (
    <>
      <DayTopbar title={title} />
      <div className="flex flex-col gap-5 px-5">
        <div className="relative">
          <WorkoutDayCard workoutDay={heroWorkoutDay} />
          {hasCompletedSession && (
            <Button
              variant="ghost"
              className="absolute bottom-5 right-5 h-[30px] rounded-full px-4 text-base font-semibold text-primary-foreground"
            >
              Concluído!
            </Button>
          )}
          {!hasCompletedSession && !inProgressSession && (
            <StartWorkoutButton workoutPlanId={id} dayId={workoutDay.id} />
          )}
        </div>
        {workoutDay.exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
        {inProgressSession && (
          <CompleteWorkoutButton
            workoutPlanId={id}
            dayId={workoutDay.id}
            sessionId={inProgressSession.id}
          />
        )}
      </div>
    </>
  );
}

export default function WorkoutDayPage({ params }: WorkoutDayPageParams) {
  return (
    <main className="min-h-svh pb-[108px] font-heading">
      <Suspense fallback={<p>Carregando...</p>}>
        <WorkoutDayContent params={params} />
      </Suspense>
      <Suspense fallback={null}>
        <Toolbar activeItem="workouts" />
      </Suspense>
    </main>
  );
}
