import { SignIn, SignInButton } from "@clerk/nextjs";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <SignIn
        path={`/${locale}/sign-in`}
        routing="path"
        redirectUrl={"/"}
        afterSignInUrl={"/"}
      />
    </div>
  );
}
