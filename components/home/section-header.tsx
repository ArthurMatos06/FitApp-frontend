import { Button } from "@/components/ui/button";

type SectionHeaderProps = {
  title: string;
  actionLabel: string;
};

export function SectionHeader({ title, actionLabel }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-lg font-semibold leading-[1.4] text-foreground">
        {title}
      </h2>
      <Button variant="link" className="h-auto p-0 text-xs font-normal">
        {actionLabel}
      </Button>
    </div>
  );
}
