import { redirect } from "next/navigation";
import { connection } from "next/server";
import dayjs from "dayjs";

import {
  getHomeData,
  getUserTrainData,
  type GetHomeData200,
  type GetUserTrainData200,
} from "./api/fetch-generated";

export type TrainReadiness = {
  trainData: GetUserTrainData200;
  homeData: GetHomeData200;
};

export async function fetchTrainReadiness(): Promise<TrainReadiness> {
  await connection();

  const today = dayjs().format("YYYY-MM-DD");

  const [trainDataResponse, homeDataResponse] = await Promise.all([
    getUserTrainData(),
    getHomeData(today),
  ]);

  if (trainDataResponse.status === 401 || homeDataResponse.status === 401) {
    redirect("/auth");
  }

  if (trainDataResponse.status !== 200 || homeDataResponse.status !== 200) {
    throw new Error("Não foi possível carregar seus dados de treino.");
  }

  return {
    trainData: trainDataResponse.data,
    homeData: homeDataResponse.data,
  };
}

export async function ensureOnboardingComplete(): Promise<TrainReadiness> {
  const readiness = await fetchTrainReadiness();

  const hasTrainData = readiness.trainData !== null;
  const hasActiveWorkoutPlan = readiness.homeData.activeWorkoutPlanId !== null;

  if (!hasTrainData || !hasActiveWorkoutPlan) {
    redirect("/onboarding");
  }

  return readiness;
}
