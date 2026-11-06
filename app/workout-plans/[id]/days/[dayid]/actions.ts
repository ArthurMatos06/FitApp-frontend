"use server";

import { revalidatePath } from "next/cache";

import {
  getWorkoutDay,
  startWorkoutSession,
  updateWorkoutSession,
} from "@/app/_lib/api/fetch-generated";

export async function startWorkoutSessionAction(
  workoutPlanId: string,
  dayId: string,
) {
  const response = await startWorkoutSession(workoutPlanId, dayId);

  if (response.status === 201) {
    revalidatePath(`/workout-plans/${workoutPlanId}/days/${dayId}`);
  }

  return { status: response.status };
}

export async function completeWorkoutSessionAction(
  workoutPlanId: string,
  dayId: string,
  sessionId: string,
) {
  const dayResponse = await getWorkoutDay(workoutPlanId, dayId);

  if (dayResponse.status !== 200) {
    return { status: dayResponse.status };
  }

  const workoutSession = dayResponse.data.sessions.find(
    (session) => session.id === sessionId,
  );

  if (!workoutSession) {
    return { status: 404 };
  }

  if (workoutSession.completedAt) {
    revalidatePath(`/workout-plans/${workoutPlanId}/days/${dayId}`);
    revalidatePath("/");

    return { status: 200 };
  }

  let status: number;

  try {
    const response = await updateWorkoutSession(
      workoutPlanId,
      dayId,
      sessionId,
      { completedAt: new Date().toISOString() },
    );

    status = response.status;
  } catch {
    return { status: 0 };
  }

  if (status === 200) {
    revalidatePath(`/workout-plans/${workoutPlanId}/days/${dayId}`);
    revalidatePath("/");
  }

  return { status };
}
