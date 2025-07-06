"use client";

import { Trash2 } from "lucide-react";

interface NoteItemProps {
  id: string;
  content: string;
  onDelete: (id: string) => void;
}

export default function NoteItem({ id, content, onDelete }: NoteItemProps) {
  return (
    <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow mb-4">
      <span>{content}</span>
      <Trash2
        className="text-black-500 cursor-pointer"
        onClick={() => onDelete(id)}
      />
    </div>
  );
}
