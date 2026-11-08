"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [isSigningOut, startSigningOut] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    setError(null);

    startSigningOut(async () => {
      const { error: signOutError } = await authClient.signOut();

      if (signOutError) {
        setError("Não foi possível sair da conta. Tente novamente.");

        return;
      }

      router.push("/auth");
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant="ghost"
        className="gap-2 text-base font-semibold text-logout"
        onClick={handleLogout}
        disabled={isSigningOut}
      >
        Sair da conta
        <LogOut className="size-5" strokeWidth={1.5} />
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
