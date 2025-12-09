import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/image.png";

export default function Footer() {
  return (
    <footer className="w-full bg-charcoal text-white ">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Image
              src={Logo}
              alt="LawWrite AI Logo"
              width={140}
              height={36}
              className="mb-4"
            />
            <p className="text-sand/70 text-sm leading-relaxed max-w-sm">
              Empowering law students to improve their legal writing through
              practice, comparison, and AI-powered reflection.
            </p>
            <div className="flex gap-4 mt-6">{/* Social links */}</div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/login"
                  className="text-sand/70 hover:text-mq-red transition-colors"
                >
                  Get Started
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-sand/70 hover:text-mq-red transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <Link
                  href="/home/help"
                  className="text-sand/70 hover:text-mq-red transition-colors"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-sand/70">
              <li className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <span>
                  Macquarie Law School, Michael Kirby Building 17 Wally’s Walk
                  <br />
                  Wallumattagal Campus
                  <br />
                  Macquarie University, NSW 2109
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <a
                  href="mailto:law@mq.edu.au"
                  className="hover:text-mq-red transition-colors"
                >
                  LAW EMAIL ADDRESS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sand/60 text-sm text-center sm:text-left">
            © 2025{" "}
            <a
              href="https://www.mq.edu.au/"
              className="hover:text-mq-red transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Macquarie University
            </a>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sand/60 text-sm">
            <span>Built by Macquarie Law School & Computing School</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
