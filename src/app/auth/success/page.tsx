import AuthSuccessPage from "@/components/auth/AuthSuccessPage";

export default function Page({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  return <AuthSuccessPage token={searchParams.token} />;
}
