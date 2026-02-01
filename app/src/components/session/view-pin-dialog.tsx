"use client";

import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useSessionStore } from "../../providers/store-provider";
import { Badge } from "../ui/badge";

interface ViewPinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  painPointId: string | null;
}

export function ViewPinDialog({
  open,
  onOpenChange,
  painPointId,
}: ViewPinDialogProps) {
  const t = useTranslations("painDialog");
  const tTypes = useTranslations("painTypes");

  const { session } = useSessionStore((state) => state);
  const point = session?.painPoints?.find((p) => p.id === painPointId);

  const getRatingColor = (value: number) => {
    if (value <= 3) return "text-green-600 dark:text-green-400";
    if (value <= 6) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getBadgeColor = (value: number) => {
    if (value <= 3) return "bg-green-500/10 text-green-700 dark:text-green-400";
    if (value <= 6) return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
    return "bg-red-500/10 text-red-700 dark:text-red-400";
  };

  if (!point) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg">{point.label || "Pain point"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-6">
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Type</Label>
            <p className="text-sm">{tTypes(point.type)}</p>
          </div>

          {point.notes && (
            <div className="space-y-1">
              <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{point.notes}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Intensity</Label>
            <div className="flex items-center gap-3">
              <span className={`text-3xl font-bold tabular-nums ${getRatingColor(point.rating)}`}>
                {point.rating}
              </span>
              <Badge className={getBadgeColor(point.rating)}>
                {point.rating <= 3 ? "Mild" : point.rating <= 6 ? "Moderate" : "Severe"}
              </Badge>
            </div>
          </div>

          <div className="text-xs text-muted-foreground pt-2">
            Created{" "}
            {new Date(point.createdAt).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="shadow-sm">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}