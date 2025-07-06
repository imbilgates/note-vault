"use client";

import { FcGoogle } from "react-icons/fc"; // Google logo icon
import { Separator } from "@/components/ui/separator";

export default function GoogleSignInButton() {
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* OR Separator */}
      <div className="flex items-center w-full gap-4">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-sm">OR</span>
        <Separator className="flex-1" />
      </div>

      {/* Google Sign In Button */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <FcGoogle className="text-xl" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Continue with Google
        </span>
      </button>
    </div>
  );
}
