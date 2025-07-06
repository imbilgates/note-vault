export const dynamic = "force-dynamic";

import AuthRedirect from "@/components/auth/AuthRedirect";

export default function AuthSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
      <AuthRedirect />
    </main>
  );
}