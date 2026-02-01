"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
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

interface AddPinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: string;
  position: { x: number; y: number; z: number } | null;
}

export function AddPinDialog({
  open,
  onOpenChange,
  sessionId,
  position,
}: AddPinDialogProps) {
  const t = useTranslations("painDialog");
  const tTypes = useTranslations("painTypes");

  const { addPainPoint } = useSessionStore((state) => state);

  const [label, setLabel] = useState("");
  const [type, setType] = useState<PainType>("other");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState([5]);

  const utils = api.useUtils();

  const addPainMutation = api.session.addPainPoint.useMutation({
    onSuccess: (newPoint) => {
      addPainPoint(newPoint);
      utils.session.getById.invalidate({ id: sessionId });
      handleClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!position) return;

    addPainMutation.mutate({
      sessionId,
      position,
      label: label || "",
      type,
      notes,
      rating: rating[0] ?? 5,
    });
  };

  const handleClose = () => {
    setLabel("");
    setType("other");
    setNotes("");
    setRating([5]);
    onOpenChange(false);
  };

  const getRatingColor = (value: number) => {
    if (value <= 3) return "text-green-600 dark:text-green-400";
    if (value <= 6) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] shadow-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-lg">Add pain point</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-6">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium">
                {t("typeLabel")}
              </Label>
              <Select value={type} onValueChange={(v) => setType(v as PainType)}>
                <SelectTrigger id="type" className="shadow-sm">
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
              <Label htmlFor="label" className="text-sm font-medium">
                Label
              </Label>
              <Input
                id="label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g., Lower back"
                autoFocus
                className="shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                {t("notesLabel")}
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional details..."
                className="min-h-[80px] shadow-sm resize-none"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="rating" className="text-sm font-medium">
                  {t("intensityLabel")}
                </Label>
                <span className={`text-3xl font-bold tabular-nums ${getRatingColor(rating[0] ?? 5)}`}>
                  {rating[0]}
                </span>
              </div>
              <Slider
                id="rating"
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
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={addPainMutation.isPending}
            >
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={addPainMutation.isPending} className="shadow-sm">
              {addPainMutation.isPending ? t("saving") : t("add")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}