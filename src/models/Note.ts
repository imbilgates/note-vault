import mongoose, { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({
  userEmail: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Note = models.Note || model("Note", NoteSchema);
