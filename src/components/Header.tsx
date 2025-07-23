"use client";

import Image from "next/image";
import Link from "next/link";
import { User, LogOut, Menu, X } from "feather-icons-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleConfirmSignOut = () => {
    signOut();
    setShowDialogModal(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="flex justify-between items-center w-full bg-primary py-4 px-4 md:px-8 lg:px-10 relative">
        <Image
          src="/logo.svg"
          alt="Jobshare logo"
          width={140}
          height={40}
          priority
          className="cursor-pointer w-28 md:w-32 lg:w-auto h-8 md:h-10 object-contain"
          onClick={() => redirect("/")}
        />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav className="flex items-center gap-6 lg:gap-8 xl:gap-12 font-bold">
            <Link
              className={`hover:text-accent transition-colors ${
                pathname === "/jobs" ? "text-accent" : "text-white"
              }`}
              href="/jobs"
            >
              Find Jobs
            </Link>
            <Link
              className={`hover:text-accent transition-colors ${
                pathname === "/companies" ? "text-accent" : "text-white"
              }`}
              href="/companies"
            >
              Companies
            </Link>
            <Link
              className={`hover:text-accent transition-colors ${
                pathname === "/about-us" ? "text-accent" : "text-white"
              }`}
              href="/about-us"
            >
              About Us
            </Link>
          </nav>
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <Link
                href="/dashboard"
                className={`hover:text-accent font-semibold transition-colors ${
                  pathname === "/dashboard" ? "text-accent" : "text-white"
                }`}
              >
                Dashboard
              </Link>
              <div
                className="w-9 h-9 bg-accent rounded-full flex items-center justify-center cursor-pointer hover:bg-yellow-200 transition-colors"
                onClick={() => setShowDialogModal(true)}
                title="Sign Out"
              >
                <LogOut className="w-5 h-5 text-primary" />
              </div>
            </div>
          ) : (
            <div
              className="w-9 h-9 bg-accent rounded-full flex items-center justify-center cursor-pointer ml-4 hover:bg-yellow-200 transition-colors"
              onClick={() => setShowLoginModal(true)}
            >
              <User className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {user && (
            <Link
              href="/dashboard"
              className={`hover:text-accent font-semibold transition-colors text-sm ${
                pathname === "/dashboard" ? "text-accent" : "text-white"
              }`}
            >
              Dashboard
            </Link>
          )}
          <button
            onClick={toggleMobileMenu}
            className="w-9 h-9 bg-accent rounded-full flex items-center justify-center cursor-pointer hover:bg-yellow-200 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-primary" />
            ) : (
              <Menu className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-primary border-t border-white/20 md:hidden z-50">
            <nav className="flex flex-col py-4">
              <Link
                className={`px-4 py-3 hover:bg-white/10 transition-colors ${
                  pathname === "/jobs" ? "text-accent bg-white/10" : "text-white"
                }`}
                href="/jobs"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find Jobs
              </Link>
              <Link
                className={`px-4 py-3 hover:bg-white/10 transition-colors ${
                  pathname === "/companies" ? "text-accent bg-white/10" : "text-white"
                }`}
                href="/companies"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Companies
              </Link>
              <Link
                className={`px-4 py-3 hover:bg-white/10 transition-colors ${
                  pathname === "/about-us" ? "text-accent bg-white/10" : "text-white"
                }`}
                href="/about-us"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              {!user && (
                <button
                  className="px-4 py-3 text-white hover:bg-white/10 transition-colors text-left"
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign In / Sign Up
                </button>
              )}
              {user && (
                <button
                  className="px-4 py-3 text-white hover:bg-white/10 transition-colors text-left"
                  onClick={() => {
                    setShowDialogModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Out
                </button>
              )}
            </nav>
          </div>
        )}
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
