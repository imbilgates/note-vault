import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Otp } from "@/models/Otp";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
  await connectDB();
  const { email, otp, username, dob } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
  }

  const otpRecord = await Otp.findOne({ email });

  if (
    !otpRecord ||
    otpRecord.otp !== otp ||
    otpRecord.expiresAt.getTime() < Date.now()
  ) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
  }

  let user = await User.findOne({ email });

  if (!user) {
    // Signup flow
    if (!username || !dob) {
      return NextResponse.json({ error: "Username and DOB required for signup" }, { status: 400 });
    }

    user = await User.create({ email, username, dob });
  }

  const token = generateToken({ email });

  await Otp.deleteOne({ email });

  return NextResponse.json({
    token,
    user: {
      email: user.email,
      username: user.username,
      dob: user.dob,
    },
  });
}
