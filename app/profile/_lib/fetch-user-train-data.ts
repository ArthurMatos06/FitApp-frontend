import { redirect } from "next/navigation";

import {
  getUserTrainData,
  type GetUserTrainData200,
} from "@/app/_lib/api/fetch-generated";

export async function fetchUserTrainData(): Promise<GetUserTrainData200> {
  const response = await getUserTrainData();

  if (response.status === 401) {
    redirect("/auth");
  }

  if (response.status !== 200) {
    throw new Error("Não foi possível carregar os dados do perfil.");
  }

  return response.data;
}
