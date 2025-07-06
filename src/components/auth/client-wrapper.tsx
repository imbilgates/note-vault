"use client";

import dynamic from "next/dynamic";

const AuthSuccessPage = dynamic(() => import("@/components/auth/AuthSuccessPage"), {
  ssr: false,
});

export default function ClientWrapper() {
  return <AuthSuccessPage />;
}
