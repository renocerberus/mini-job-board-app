import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-between w-full bg-gradient-to-r from-primary to-tertiary py-8 px-10">
      <div className="flex flex-col gap-4 w-1/3">
        <Image
          src="/logo.svg"
          alt="Jobshare logo"
          width={140}
          height={40}
          priority
        />
        <p className="text-white text-base">
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
      <div className="flex flex-row gap-8 justify-end">
        <div className="flex flex-col gap-4">
          <h3 className="text-accent text-lg font-bold">For Employers</h3>
          <ul className="flex flex-col gap-2 text-white text-base">
            <li>
              <Link href="#" className="hover:text-accent">
                Accounts
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-accent">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-accent">
                Post a Job
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-accent text-lg font-bold">For Job Seekers</h3>
          <ul className="flex flex-col gap-2 text-white text-base">
            <li>
              <Link href="/jobs" className="hover:text-accent">
                Find Jobs
              </Link>
            </li>
            <li>
              <Link href="/companies" className="hover:text-accent">
                Companies
              </Link>
            </li>
            <li>
              <Link href="/contact_us" className="hover:text-accent">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
