import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="flex flex-col items-center justify-around w-full text-sm bg-slate-50 text-gray-800/70 mt-20">
        <Image src="/logo.png" alt="logo" width={157} height={40} />
        <p className="mt-4 text-center">
          Copyright © 2025{" "}
          <a href="https://www.mq.edu.au/">Macquarie University</a>. All rights
          reservered.
        </p>
      </footer>
    </>
  );
}
