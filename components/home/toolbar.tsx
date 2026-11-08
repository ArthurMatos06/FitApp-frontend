import Link from "next/link";
import { connection } from "next/server";
import dayjs from "dayjs";
import {
  Calendar,
  ChartNoAxesColumn,
  House,
  UserRound,
} from "lucide-react";

import { getHomeData, type GetHomeData200TodayWorkoutDay } from "@/app/_lib/api/fetch-generated";
import { AiChatButton } from "@/components/home/ai-chat-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ToolbarProps = {
  activeItem?: "home" | "workouts" | "stats" | "profile";
};

export async function Toolbar({ activeItem = "home" }: ToolbarProps) {
  await connection();
  const today = dayjs().format("YYYY-MM-DD");

  let todayWorkoutDay: GetHomeData200TodayWorkoutDay | undefined;

  try {
    const response = await getHomeData(today);
    todayWorkoutDay =
      response.status === 200 ? response.data.todayWorkoutDay : undefined;
  } catch {
    todayWorkoutDay = undefined;
  }

  const workoutHref = todayWorkoutDay
    ? `/workout-plans/${todayWorkoutDay.workoutPlanId}`
    : null;

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
            activeItem === "home" ? "text-foreground" : "text-muted-foreground",
          )}
        />
      </Button>
      {workoutHref ? (
        <Button
          variant="ghost"
          className="size-12"
          render={<Link href={workoutHref} />}
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
      <AiChatButton />
      <Button
        variant="ghost"
        className="size-12"
        render={<Link href="/stats" />}
        aria-label="Estatísticas"
      >
        <ChartNoAxesColumn
          className={cn(
            "size-6",
            activeItem === "stats"
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        />
      </Button>
      <Button
        variant="ghost"
        className="size-12"
        render={<Link href="/profile" />}
        aria-label="Perfil"
      >
        <UserRound
          className={cn(
            "size-6",
            activeItem === "profile"
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        />
      </Button>
    </nav>
  );
}
