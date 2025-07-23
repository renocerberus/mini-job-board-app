"use client";

import { ChevronLeft } from "feather-icons-react";
import { useRouter } from "next/navigation";

export default function BackHeader({ label }: { label: string }) {
  const router = useRouter();

  return (
    <div
      className="flex flex-row gap-2 items-center cursor-pointer"
      onClick={() => router.back()}
    >
      <ChevronLeft className="w-6 h-6" />
      <span className="text-lg font-bold">{label}</span>
    </div>
  );
}
