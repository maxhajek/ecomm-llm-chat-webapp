import { SignUp } from "@clerk/nextjs";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <SignUp path={`/${locale}/sign-up`} routing="path" />;
    </div>
  );
}
