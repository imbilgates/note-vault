import AuthSuccessPage from "@/components/auth/AuthSuccessPage";

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const token =
    typeof searchParams?.token === "string" ? searchParams.token : undefined;

  return <AuthSuccessPage token={token} />;
}
