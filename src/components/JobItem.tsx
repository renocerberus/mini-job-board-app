import { Job } from "@/api/types";
import { formatDistanceToNow } from "date-fns";
import JobTypeBadge from "@/components/JobTypeBadge";
import Link from "next/link";
import CompanyLogoInitial from "@/components/CompanyLogoInitial";

export default function JobItem({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="flex flex-row gap-4 p-4 border border-disabled rounded-xl hover:bg-gray-200 transition-all duration-300 cursor-pointer"
    >
      <CompanyLogoInitial
        companyName={job.company_name}
        width={150}
        height={100}
      />
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-base text-tertiary font-semibold">
          {job.company_name} - {job.location}
        </p>
        <p className="text-base text-disabled font-medium">
          Posted {formatDistanceToNow(job.created_at)} ago
        </p>
      </div>
      <JobTypeBadge jobType={job.job_type} />
    </Link>
  );
}
