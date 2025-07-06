import { NextResponse } from "next/server";

export async function GET() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
  
  const redirectURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${BASE_URL}/api/auth/google/callback&response_type=code&scope=openid%20email%20profile`;

  return NextResponse.redirect(redirectURL);
}
