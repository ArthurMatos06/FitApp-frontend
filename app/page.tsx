import { Suspense } from "react";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import dayjs from "dayjs";

import { authClient } from "@/app/_lib/auth-client";
import { getHomeData } from "./_lib/api/fetch-generated";

async function HomeContent() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const homeData = await getHomeData(dayjs().format("YYYY-MM-DD"));

  console.log(homeData);

  return (
    <div className="flex min-h-svh items-center justify-center">
      <p>Home</p>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <HomeContent />
    </Suspense>
  );
}