"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface NewNoteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  loading: boolean;
}

export default function NewNoteModal({ open, onClose, onSubmit, loading }: NewNoteModalProps) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim());
      setContent(""); // reset after submit
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4"
          rows={5}
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Save Note"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
