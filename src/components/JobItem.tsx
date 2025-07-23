import { Job } from "@/api/types";
import { formatDistanceToNow } from "date-fns";
import JobTypeBadge from "@/components/JobTypeBadge";
import Link from "next/link";
import CompanyLogoInitial from "@/components/CompanyLogoInitial";

export default function JobItem({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="flex flex-col sm:flex-row gap-5 p-5 border border-disabled rounded-xl hover:bg-gray-200 transition-all duration-300 cursor-pointer"
    >
      {/* Company Logo - Mobile: Top, Desktop: Left */}
      <div className="flex justify-center sm:justify-start flex-shrink-0">
        <CompanyLogoInitial
          companyName={job.company_name}
          width={120}
          height={80}
        />
      </div>
      
      {/* Job Details - Mobile: Middle, Desktop: Center */}
      <div className="flex flex-col w-full gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left leading-tight">{job.title}</h1>
        <p className="text-sm sm:text-base text-tertiary font-semibold text-center sm:text-left">
          {job.company_name} - {job.location}
        </p>
        <p className="text-sm sm:text-base text-disabled font-medium text-center sm:text-left">
          Posted {formatDistanceToNow(job.created_at)} ago
        </p>
      </div>
      
      {/* Job Type Badge - Mobile: Bottom, Desktop: Right */}
      <div className="flex justify-center sm:justify-end flex-shrink-0">
        <JobTypeBadge jobType={job.job_type} />
      </div>
    </Link>
  );
}
