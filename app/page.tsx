"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";

const PageHome = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/auth");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return null;
  }

  return <div className="flex flex-1 items-center justify-center" />;
};

export default PageHome;
