const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// 🔐 Request OTP for login
export const requestLoginOtp = async (email: string) => {
  const res = await fetch(`${API_BASE}/api/auth/request-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to send OTP");
  }

  return res.json(); // { message: "OTP sent successfully" }
};

// 📝 Request OTP for signup
export const requestSignupOtp = async (email: string) => {
  const res = await fetch(`${API_BASE}/api/auth/request-otp-signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to send signup OTP");
  }

  return res.json(); // { message: "OTP sent successfully" }
};

// ✅ Verify OTP (works for both login & signup)
export const verifyOtp = async ({
  email,
  otp,
  username,
  dob,
}: {
  email: string;
  otp: string;
  username?: string;
  dob?: string;
}) => {
  const payload: Record<string, string> = {
    email: email.trim(),
    otp: otp.trim(),
  };

  if (username) payload.username = username.trim();
  if (dob) payload.dob = dob;

  const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "OTP verification failed");
  }

  return res.json(); // { token, user }
};
