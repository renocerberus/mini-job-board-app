import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col lg:flex-row justify-between w-full bg-gradient-to-r from-primary to-tertiary py-8 sm:py-12 px-4 sm:px-8 lg:px-10 gap-8 lg:gap-0">
      <div className="flex flex-col gap-5 w-full lg:w-2/5">
        <Image
          src="/logo.svg"
          alt="Jobshare logo"
          width={140}
          height={40}
          priority
          className="w-32 lg:w-36 object-contain"
        />
        <p className="text-white text-sm sm:text-base leading-relaxed">
          Discover the best remote jobs at top remote companies and take control
          of your career without being tied to a single location. Whether
          you&apos;re a developer, designer, marketer, or customer support
          expert, leading remote-first companies are actively hiring talent from
          around the world. These organizations prioritize flexibility, trust,
          and results—offering competitive salaries, global collaboration, and
          work-life balance. With the right opportunity, you can thrive
          professionally while enjoying the freedom to work from anywhere.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-start lg:justify-end">
        <div className="flex flex-col gap-4">
          <h3 className="text-accent text-base sm:text-lg font-bold">For Employers</h3>
          <ul className="flex flex-col gap-3 text-white text-sm sm:text-base">
            <li>
              <Link href="#" className="hover:text-accent transition-colors">
                Accounts
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-accent transition-colors">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-accent transition-colors">
                Post a Job
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-accent text-base sm:text-lg font-bold">For Job Seekers</h3>
          <ul className="flex flex-col gap-3 text-white text-sm sm:text-base">
            <li>
              <Link href="/jobs" className="hover:text-accent transition-colors">
                Find Jobs
              </Link>
            </li>
            <li>
              <Link href="/companies" className="hover:text-accent transition-colors">
                Companies
              </Link>
            </li>
            <li>
              <Link href="/contact_us" className="hover:text-accent transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
