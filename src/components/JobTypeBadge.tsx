import { APP_CONFIG } from "@/lib/config";

export default function JobTypeBadge({
  jobType,
}: {
  jobType: "full-time" | "part-time" | "contract";
}) {
  const jobTypeMap = {
    [APP_CONFIG.JOB_TYPES.FULL_TIME]: "Full-Time",
    [APP_CONFIG.JOB_TYPES.PART_TIME]: "Part-Time",
    [APP_CONFIG.JOB_TYPES.CONTRACT]: "Contract",
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-center bg-primary rounded-xl px-4 py-3 w-fit min-w-[90px] sm:min-w-[110px] h-fit mt-auto">
      <p className="text-xs sm:text-sm text-accent font-bold">{jobTypeMap[jobType]}</p>
    </div>
  );
}
