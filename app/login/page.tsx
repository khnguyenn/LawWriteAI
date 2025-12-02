import { LoginForm } from "@/components/LoginForm";
import Image from "next/image";
import logoImage from "@/assets/law1.jpg";
import { NavBar } from "@/components/NavBar";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full flex-col">
      <NavBar />

      <div className="flex flex-1 w-full overflow-hidden">
        <div className="relative hidden lg:flex lg:w-1/2 bg-charcoal">
          <div className="relative h-full w-full">
            <Image
              src={logoImage}
              alt="logo"
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-4 sm:p-8 h-full">
          <div className="w-full max-w-md space-y-4 flex flex-col">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
