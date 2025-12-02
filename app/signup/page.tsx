import { SignUpForm } from "@/components/SignUpForm";
import Image from "next/image";
import logoImage from "@/assets/law1.jpg";

export default function SignupPage() {
  return (
    <div className="flex h-screen w-full">
      <div className="relative hidden lg:flex lg:w-1/2 bg-carbon-charcoal">
        <div className="flex flex-col justify-between w-full">
          <Image
            src={logoImage}
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-4 sm:p-8 h-full">
        <div className="w-full max-w-md space-y-4 flex flex-col">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
