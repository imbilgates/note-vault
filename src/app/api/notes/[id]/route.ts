import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Note } from "@/models/Note";
import { verifyToken } from "@/lib/jwt";

export async function DELETE(req: NextRequest) {
  await connectDB();

  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token) as { email: string };

    // ✅ Get ID from the URL
    const id = req.nextUrl.pathname.split("/").pop();

    const note = await Note.findOneAndDelete({
      _id: id,
      userEmail: decoded.email,
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note deleted successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid Token";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
