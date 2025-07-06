const API_BASE = "";

export const fetchNotes = async (token: string) => {
  const res = await fetch(`${API_BASE}/api/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
};

export const createNote = async (token: string, content: string) => {
  const res = await fetch(`${API_BASE}/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
};

export const deleteNote = async (token: string, noteId: string) => {
  const res = await fetch(`${API_BASE}/api/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete note");
  return res.json();
};
