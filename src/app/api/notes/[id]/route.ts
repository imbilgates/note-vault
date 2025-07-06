import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Note } from "@/models/Note";
import { verifyToken } from "@/lib/jwt";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const token = authHeader.split(" ")[1];
    const decoded: any = verifyToken(token);

    const note = await Note.findOneAndDelete({ _id: params.id, userEmail: decoded.email });
    if (!note) return NextResponse.json({ error: "Note not found" }, { status: 404 });

    return NextResponse.json({ message: "Note deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }
}
