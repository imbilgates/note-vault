"use client";

import { useState } from "react";
import Image from "next/image";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleForm = () => setIsSignIn((prev) => !prev);

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative bg-white dark:bg-zinc-900">
      {/* 🔰 Logo (fixed at top-left on desktop) */}
      <div className="hidden md:block absolute top-6 left-0 -translate-x-1/3 z-10 overflow-visible">
        <Image
          src="/assets/icon.png"
          alt="NoteVault Logo"
          width={240}
          height={100}
          priority
        />
      </div>

      {/* Left Side: Form */}
      <div className="flex items-center justify-center px-6 sm:px-12 py-12">
        <div className="w-full max-w-md space-y-6">
          {/* 🔰 Show logo centered above form only on mobile */}
          <div className="block md:hidden flex justify-center">
            <Image
              src="/assets/icon.png"
              alt="NoteVault Logo"
              width={260}
              height={100}
              priority
            />
          </div>

          {isSignIn ? (
            <SignInForm toggleForm={toggleForm} />
          ) : (
            <SignUpForm toggleForm={toggleForm} />
          )}
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden md:flex items-center justify-center bg-[#f3f4f6] dark:bg-zinc-900">
        <Image
          src="/assets/bg.png"
          alt="Vault Illustration"
          width={849}
          height={1024}
          className="object-contain"
          priority
        />
      </div>
    </main>
  );
}
