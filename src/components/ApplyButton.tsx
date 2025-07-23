"use client";

import Button from "@/components/Button";
import { Send } from "feather-icons-react";

export default function ApplyButton({ jobId }: { jobId: number }) {
  const handleApply = () => {
    // TODO: Implement job application logic
    console.log(`Applying for job ${jobId}`);
    alert("Application feature coming soon!");
  };

  return (
    <Button
      label="Apply Now"
      type="gradient"
      onClick={handleApply}
      icon={<Send className="w-4 h-4 text-white" />}
    />
  );
} 