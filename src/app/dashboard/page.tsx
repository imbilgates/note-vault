"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { fetchNotes, createNote, deleteNote } from "@/services/noteService";
import { useAuth } from "@/context/AuthContext";

import CreateNoteButton from "@/components/notes/CreateNoteButton";
import NotesList from "@/components/notes/NotesList";
import NewNoteModal from "@/components/notes/NewNoteModal";

interface Note {
  _id: string;
  content: string;
}

export default function DashboardPage() {
  const { user, token, logout, loading: authLoading } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;

    if (!token || !user?.email) {
      router.push("/");
      return;
    }

    fetchNotes(token)
      .then((data) => setNotes(data))
      .catch((err) => console.error("Failed to fetch notes:", err))
      .finally(() => setLoading(false));
  }, [authLoading, token, user, router]);

  const handleCreateNote = async (content: string) => {
    if (!token) return;
    setCreating(true);
    try {
      const newNote = await createNote(token, content);
      setNotes((prev) => [newNote, ...prev]);
      setOpenModal(false);
    } catch (err) {
      console.error("Failed to create note:", err);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!token) return;
    try {
      await deleteNote(token, id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 pt-4 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/menu.png"
            alt="NoteVault Logo"
            width={47}
            height={32}
            priority
          />
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <button
          onClick={logout}
          className="text-blue-600 underline font-medium"
        >
          Sign Out
        </button>
      </div>

      {/* Welcome Card */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-bold mb-1">Welcome, {user?.username || "User"}!</h2>
        <p className="text-gray-600">Email: {user?.email}</p>
      </div>

      {/* Create Note Button */}
      <CreateNoteButton creating={creating} onCreate={() => setOpenModal(true)} />

      {/* Notes Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Notes</h3>
        <NotesList notes={notes} loading={loading} onDelete={handleDeleteNote} />
      </div>

      {/* Modal */}
      <NewNoteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateNote}
        loading={creating}
      />
    </main>
  );
}
