"use client";

import NoteItem from "./NoteItem";

interface NotesListProps {
  notes: { _id: string; content: string }[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function NotesList({ notes, loading, onDelete }: NotesListProps) {
  if (loading) return <p>Loading...</p>;
  if (notes.length === 0) return <p className="text-gray-500">No notes yet. Create one!</p>;

  return (
    <>
      {notes.map((note) => (
        <NoteItem
          key={note._id}
          id={note._id}
          content={note.content}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}
