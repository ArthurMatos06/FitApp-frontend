import Link from "next/link";
import { headers } from "next/headers";
import dayjs from "dayjs";
import {
  Calendar,
  ChartNoAxesColumn,
  House,
  Sparkles,
  UserRound,
} from "lucide-react";

import { getHomeData } from "@/app/_lib/api/fetch-generated";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ToolbarProps = {
  activeItem?: "home" | "workouts";
};

export async function Toolbar({ activeItem = "home" }: ToolbarProps) {
  await headers();
  const today = dayjs().format("YYYY-MM-DD");
  const response = await getHomeData(today);
  const todayWorkoutDay =
    response.status === 200 ? response.data.todayWorkoutDay : undefined;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 flex h-[88px] items-center justify-center gap-6 rounded-t-[20px] border border-border bg-background px-6 py-4">
      <Button
        variant="ghost"
        className="size-12"
        render={<Link href="/" />}
        aria-label="Início"
      >
        <House
          className={cn(
            "size-6",
            activeItem === "home"
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        />
      </Button>
      {todayWorkoutDay ? (
        <Button
          variant="ghost"
          className="size-12"
          render={
            <Link
              href={`/workout-plans/${todayWorkoutDay.workoutPlanId}/days/${todayWorkoutDay.id}`}
            />
          }
          aria-label="Treinos"
        >
          <Calendar
            className={cn(
              "size-6",
              activeItem === "workouts"
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          />
        </Button>
      ) : (
        <Button variant="ghost" className="size-12" aria-label="Treinos">
          <Calendar className="size-6 text-muted-foreground" />
        </Button>
      )}
      <Button className="size-14 rounded-full" aria-label="FIT.AI">
        <Sparkles className="size-6 text-primary-foreground" />
      </Button>
      <Button variant="ghost" className="size-12" aria-label="Estatísticas">
        <ChartNoAxesColumn className="size-6 text-muted-foreground" />
      </Button>
      <Button variant="ghost" className="size-12" aria-label="Perfil">
        <UserRound className="size-6 text-muted-foreground" />
      </Button>
    </nav>
  );
}
