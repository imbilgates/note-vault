"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      router.replace("/dashboard");
    } else {
      router.replace("/");
    }
  }, [searchParams, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
          Logging you in...
        </p>
      </div>
    </main>
  );
}
