import Logo from "@/components/shared/Logo";
import { WavyBackground } from "@/components/ui/wavy-background";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-10">
        <Link href="/">
          <Logo />
        </Link>
        <SignUp fallbackRedirectUrl="/dashboard" afterSignOutUrl="/" />
      </div>

      <WavyBackground />
    </div>
  );
}
