"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreateNoteButtonProps {
  creating: boolean;
  onCreate: () => void;
}

export default function CreateNoteButton({
  creating,
  onCreate,
}: CreateNoteButtonProps) {
  return (
    <Button
      onClick={onCreate}
      disabled={creating}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg mb-6"
    >
      {creating ? (
        <>
          <Loader2 className="animate-spin mr-2 h-5 w-5" />
          Creating...
        </>
      ) : (
        "➕ Create Note"
      )}
    </Button>
  );
}
