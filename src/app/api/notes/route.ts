import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Note } from "@/models/Note";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  await connectDB();
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token) as { email: string };

    const notes = await Note.find({ userEmail: decoded.email });
    return NextResponse.json(notes);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid Token";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token) as { email: string };

    const { content } = await req.json();
    const newNote = await Note.create({ userEmail: decoded.email, content });

    return NextResponse.json(newNote);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid Token";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
