"use client";

import { useState } from "react";
import { BodyViewer } from "./body-viewer";
import { PinListPanel } from "./pin-list-panel";
import { EditPinDialog } from "./edit-pin-dialog";
import { MessageInput } from "@/components/session/message-input";
import { Textarea } from "@/components/ui/textarea";
import { transcribeAudio } from "@/lib/audio-utils";
import type { PainPoint } from "@/server/db/schema";

interface Props {
  sessionId: string;
  sessionTitle: string | null;
  initialPainPoints: PainPoint[];
}

export function SessionView({
  sessionId,
  sessionTitle,
  initialPainPoints,
}: Props) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPinId, setEditingPinId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState("");
  const [targetMesh, setTargetMesh] = useState<string | null>(null);

  const handlePinClick = (pinId: string) => {
    setEditingPinId(pinId);
    setIsEditDialogOpen(true);
  };

  const handleTestAddPin = (meshName: string) => {
    setTargetMesh(meshName);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="border-b p-4 bg-background z-10">
        <h1 className="text-xl font-semibold">{sessionTitle}</h1>
      </header>

      {/* Main content - 3 columns layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel - Pain points list */}
        <PinListPanel 
          sessionId={sessionId} 
          onPinClick={handlePinClick}
          onTestAddPin={handleTestAddPin}
        />

        {/* Center - 3D Viewer with MessageInput */}
        <div className="flex-1 relative">
          <BodyViewer
            sessionId={sessionId}
            initialPainPoints={initialPainPoints}
            onPinClick={handlePinClick}
            targetMesh={targetMesh}
            setTargetMesh={setTargetMesh}
          />

          {/* MessageInput at bottom center */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Message submitted:", input);
                setInput("");
              }}
            >
              <MessageInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                isGenerating={false}
                transcribeAudio={transcribeAudio}
                submitOnEnter={true}
              />
            </form>
          </div>
        </div>

        <div className="w-80 border-l flex flex-col bg-background">
          <Textarea
            placeholder="Describe what's wrong..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="flex-1 resize-none border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-4 rounded-none"
          />
        </div>
      </div>

      {/* Edit dialog */}
      <EditPinDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        sessionId={sessionId}
        painPointId={editingPinId}
      />
    </div>
  );
}