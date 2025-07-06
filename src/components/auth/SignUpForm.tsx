"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { requestSignupOtp, verifyOtp } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OtpFormSection from "./OtpFormSection";
import { toast } from "sonner";

interface Props {
  toggleForm: () => void;
}

export default function SignUpForm({ toggleForm }: Props) {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await requestSignupOtp(form.email.trim());
      setStep("otp");
      toast.success("OTP sent to your email.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyOtp({
        email: form.email.trim(),
        otp: form.otp.trim(),
        username: form.name.trim(),
        dob: form.dob,
      });
      localStorage.setItem("token", res.token);
      toast.success("Signed up successfully!");
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
        <h2 className="text-3xl font-bold">Sign Up</h2>
        <p className="text-sm text-muted-foreground">
          Join Highway Delite today
        </p>
      </div>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input
            name="name"
            placeholder="Jane Doe"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>DOB</Label>
          <Input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            disabled={step === "otp"}
            required
          />
        </div>

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
          <OtpFormSection
            otp={form.otp}
            loading={loading}
            onChange={handleChange}
            buttonLabel="Sign Up"
            onResend={handleSendOtp}
          />
        )}

        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
}
