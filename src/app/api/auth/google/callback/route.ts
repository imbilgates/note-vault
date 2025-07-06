import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

  const data = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    redirect_uri: `${BASE_URL}/api/auth/google/callback`,
    grant_type: "authorization_code",
  };

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const tokenData = await tokenRes.json();
  const { access_token } = tokenData;

  const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const profile = await userRes.json();

  const jwtToken = jwt.sign(
    {
      name: profile.name,
      email: profile.email,
      picture: profile.picture,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // ✅ Use dynamic base URL for redirect
  return NextResponse.redirect(`${BASE_URL}/auth/success?token=${jwtToken}`);
}
