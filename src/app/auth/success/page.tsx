import AuthSuccessPage from "@/components/auth/AuthSuccessPage";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Page({ searchParams }: Props) {
  const token = typeof searchParams?.token === "string" ? searchParams.token : undefined;
  return <AuthSuccessPage token={token} />;
}
