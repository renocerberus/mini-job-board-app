"use client";

import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import Onboarding from "@/components/Onboarding";

export default function Home() {
  return (
    <div className="font-sans">
      <main className="flex flex-col">
        <div className="flex flex-col w-full bg-gradient-to-r from-tertiary to-primary">
          <div className="flex flex-col w-full py-8 px-10">
            <SearchBar hasFilters isRedirect />
          </div>
          <Onboarding />
        </div>
      </main>
    </div>
  );
}
