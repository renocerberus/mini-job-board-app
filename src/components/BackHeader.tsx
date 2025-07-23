"use client";

import { ChevronLeft } from "feather-icons-react";
import { useRouter } from "next/navigation";

export default function BackHeader({ label }: { label: string }) {
  const router = useRouter();

  return (
    <div
      className="flex flex-row gap-2 items-center cursor-pointer hover:opacity-80 transition-opacity"
      onClick={() => router.back()}
    >
      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="text-base sm:text-lg font-bold">{label}</span>
    </div>
  );
}
