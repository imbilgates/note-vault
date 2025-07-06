"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { requestLoginOtp, verifyOtp } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import OtpFormSection from "./OtpFormSection";
import { toast } from "sonner";

interface Props {
  toggleForm: () => void;
}

export default function SignInForm({ toggleForm }: Props) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [form, setForm] = useState({ email: "", otp: "", keepLoggedIn: false });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await requestLoginOtp(form.email.trim());
      setStep("otp");
      toast.success("OTP sent to your email.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyOtp({
        email: form.email.trim(),
        otp: form.otp.trim(),
      });
      localStorage.setItem("token", res.token);
      toast.success("Signed in successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 🔤 Heading */}
      <div className="space-y-1 text-center md:text-left">
        <h2 className="text-3xl font-bold">Sign In</h2>
        <p className="text-sm text-muted-foreground">
          Please login to continue to your account.
        </p>
      </div>

      <form onSubmit={handleSignIn} className="space-y-4">
        <Input
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          disabled={step === "otp"}
          required
        />

        {step === "email" ? (
          <Button
            type="button"
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        ) : (
          <>
            <OtpFormSection
              otp={form.otp}
              loading={loading}
              onChange={handleChange}
              buttonLabel="Sign In"
              onResend={handleSendOtp}
            />
          </>
        )}

        <p className="text-sm text-center text-muted-foreground">
          Need an account?{" "}
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-600 font-medium hover:underline"
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
}
