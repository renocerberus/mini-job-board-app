"use client";

import Image from "next/image";
import Link from "next/link";
import { User, LogOut } from "feather-icons-react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";
import UserModal from "./UserModal";
import { useAuth } from "@/lib/authContext";
import DialogModal from "./DialogModal";

export default function Header() {
  const pathname = usePathname();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDialogModal, setShowDialogModal] = useState(false);
  const { user, signOut } = useAuth();

  const handleConfirmSignOut = () => {
    signOut();
    setShowDialogModal(false);
  };

  return (
    <>
      <header className="flex justify-between items-center w-full bg-primary py-3 px-10">
        <Image
          src="/logo.svg"
          alt="Jobshare logo"
          width={140}
          height={40}
          priority
          className="cursor-pointer"
          onClick={() => redirect("/")}
        />
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-12 font-bold">
            <Link
              className={`hover:text-accent ${
                pathname === "/jobs" ? "text-accent" : "text-white"
              }`}
              href="/jobs"
            >
              Find Jobs
            </Link>
            <Link
              className={`hover:text-accent ${
                pathname === "/companies" ? "text-accent" : "text-white"
              }`}
              href="/companies"
            >
              Companies
            </Link>
            <Link
              className={`hover:text-accent ${
                pathname === "/about-us" ? "text-accent" : "text-white"
              }`}
              href="/about-us"
            >
              About Us
            </Link>
          </nav>
          {user ? (
            <div className="flex items-center gap-4 mx-4">
              <Link
                href="/dashboard"
                className={`hover:text-accent font-semibold ${
                  pathname === "/dashboard" ? "text-accent" : "text-white"
                }`}
              >
                Dashboard
              </Link>
              <div
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => setShowDialogModal(true)}
                title="Sign Out"
              >
                <LogOut className="w-5 h-5 text-primary" />
              </div>
            </div>
          ) : (
            <div
              className="w-8 h-8 bg-accent rounded-full flex items-center justify-center cursor-pointer ml-4"
              onClick={() => setShowLoginModal(true)}
            >
              <User className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>
      </header>
      {showLoginModal && <UserModal onClose={() => setShowLoginModal(false)} />}
      {showDialogModal && (
        <DialogModal
          confirmLabel="Sign Out"
          onConfirm={handleConfirmSignOut}
          onCancel={() => setShowDialogModal(false)}
          title="Sign Out"
          content="Are you sure you want to sign out?"
        />
      )}
    </>
  );
}
