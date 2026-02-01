"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { api } from "../../lib/trpc/client";
import { useSessionStore } from "../../providers/store-provider";
import { PAIN_TYPES, type PainType } from "../../types/TPainPoint";

interface EditPinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: string;
  painPointId: string | null;
}

export function EditPinDialog({
  open,
  onOpenChange,
  sessionId,
  painPointId,
}: EditPinDialogProps) {
  const t = useTranslations("painDialog");
  const tTypes = useTranslations("painTypes");

  const { session, updatePainPoint, removePainPoint, clearSelection } = useSessionStore(
    (state) => state
  );

  const [type, setType] = useState<PainType>("other");
  const [label, setLabel] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState([5]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const utils = api.useUtils();

  const point = session?.painPoints?.find((p) => p.id === painPointId);

  useEffect(() => {
    if (point) {
      setLabel(point.label ?? "");
      setType(point.type);
      setNotes(point.notes ?? "");
      setRating([point.rating ?? 5]);
    }
  }, [point]);

  const updateMutation = api.session.updatePainPoint.useMutation({
    onSuccess: (updatedPoint) => {
      updatePainPoint(painPointId!, {
        label: updatedPoint.label,
        type: updatedPoint.type,
        notes: updatedPoint.notes ?? undefined,
        rating: updatedPoint.rating,
      });
      utils.session.getById.invalidate({ id: sessionId });
      onOpenChange(false);
    },
  });

  const deleteMutation = api.session.deletePainPoint.useMutation({
    onSuccess: () => {
      removePainPoint(painPointId!);
      clearSelection();
      utils.session.getById.invalidate({ id: sessionId });
      onOpenChange(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!painPointId) return;

    updateMutation.mutate({
      id: painPointId,
      sessionId,
      label: label || "",
      type,
      notes,
      rating: rating[0] ?? 5,
    });
  };

  const handleDelete = () => {
    if (!painPointId) return;
    deleteMutation.mutate({
      id: painPointId,
      sessionId,
    });
    setShowDeleteAlert(false);
  };

  const getRatingColor = (value: number) => {
    if (value <= 3) return "text-green-600 dark:text-green-400";
    if (value <= 6) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  if (!point) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] shadow-lg">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="text-lg">Edit pain point</DialogTitle>
            </DialogHeader>

            <div className="space-y-5 py-6">
              <div className="space-y-2">
                <Label htmlFor="edit-type" className="text-sm font-medium">
                  {t("typeLabel")}
                </Label>
                <Select value={type} onValueChange={(v) => setType(v as PainType)}>
                  <SelectTrigger id="edit-type" className="shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAIN_TYPES.map((key) => (
                      <SelectItem key={key} value={key}>
                        {tTypes(key)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-label" className="text-sm font-medium">
                  Label
                </Label>
                <Input
                  id="edit-label"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g., Lower back"
                  className="shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-notes" className="text-sm font-medium">
                  {t("notesLabel")}
                </Label>
                <Textarea
                  id="edit-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional details..."
                  className="min-h-[80px] shadow-sm resize-none"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="edit-rating" className="text-sm font-medium">
                    {t("intensityLabel")}
                  </Label>
                  <span
                    className={`text-3xl font-bold tabular-nums ${getRatingColor(rating[0] ?? 5)}`}
                  >
                    {rating[0]}
                  </span>
                </div>
                <Slider
                  id="edit-rating"
                  min={0}
                  max={10}
                  step={1}
                  value={rating}
                  onValueChange={setRating}
                  className="py-1"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{t("intensityMin")}</span>
                  <span>{t("intensityMax")}</span>
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

            <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowDeleteAlert(true)}
                disabled={updateMutation.isPending || deleteMutation.isPending}
                className="sm:mr-auto text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                {t("delete")}
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                  disabled={updateMutation.isPending || deleteMutation.isPending}
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  disabled={updateMutation.isPending || deleteMutation.isPending}
                  className="shadow-sm"
                >
                  {updateMutation.isPending ? t("saving") : t("save")}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete pain point?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The pain point will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="shadow-sm">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}