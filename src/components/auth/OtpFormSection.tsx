"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface OtpFormSectionProps {
  otp: string;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonLabel: string;
  onResend?: () => void;
}

export default function OtpFormSection({
  otp,
  loading,
  onChange,
  buttonLabel,
  onResend,
}: OtpFormSectionProps) {
  return (
    <>
      <Input
        name="otp"
        placeholder="Enter OTP"
        value={otp}
        onChange={onChange}
        maxLength={6}
        required
      />

      {/* 🔁 Resend OTP left-aligned below input */}
      {onResend && (
        <div className="mt-1">
          <button
            type="button"
            onClick={onResend}
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            Resend OTP
          </button>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="keepLoggedIn"
          name="keepLoggedIn"
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
        />
        <label
          htmlFor="keepLoggedIn"
          className="text-sm text-gray-700 dark:text-gray-300 select-none"
        >
          Keep me logged in
        </label>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-700"
      >
        {loading ? "Verifying..." : buttonLabel}
      </Button>
    </>
  );
}
