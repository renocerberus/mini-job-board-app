import BackHeader from "@/components/BackHeader";
import CompanyLogoInitial from "@/components/CompanyLogoInitial";
import JobTypeBadge from "@/components/JobTypeBadge";
import { Job } from "@/api/types";
import { supabase } from "@/lib/supabaseClient";
import { formatDistanceToNow } from "date-fns";
import { APP_CONFIG } from "@/lib/config";
import { notFound } from "next/navigation";
import ApplyButton from "@/components/ApplyButton";

// Dummy jobs data for static generation
const dummyJobs: Job[] = [
  {
    id: 1,
    created_at: 1753247057,
    title: "Software Engineer",
    company_name: "Reno Technologies, LLC",
    description:
      "We are looking for a software engineer with 3 years of experience in React and Node.js.",
    location: "Jakarta, Indonesia",
    job_type: APP_CONFIG.JOB_TYPES.FULL_TIME,
    created_by_id: "1",
  },
  {
    id: 2,
    created_at: 1753247057,
    title: "Software Engineer",
    company_name: "Reno Technologies, LLC",
    description:
      "We are looking for a software engineer with 3 years of experience in React and Node.js.",
    location: "Jakarta, Indonesia",
    job_type: APP_CONFIG.JOB_TYPES.PART_TIME,
    created_by_id: "1",
  },
  {
    id: 3,
    created_at: 1753247057,
    title: "Software Engineer",
    company_name: "Reno Technologies, LLC",
    description:
      "We are looking for a software engineer with 3 years of experience in React and Node.js.",
    location: "Jakarta, Indonesia",
    job_type: APP_CONFIG.JOB_TYPES.CONTRACT,
    created_by_id: "1",
  },
  {
    id: 4,
    created_at: 1753247057,
    title: "Software Engineer",
    company_name: "Reno Technologies, LLC",
    description:
      "We are looking for a software engineer with 3 years of experience in React and Node.js.",
    location: "Jakarta, Indonesia",
    job_type: APP_CONFIG.JOB_TYPES.FULL_TIME,
    created_by_id: "1",
  },
  {
    id: 5,
    created_at: 1753247057,
    title: "Software Engineer",
    company_name: "Reno Technologies, LLC",
    description:
      "We are looking for a software engineer with 3 years of experience in React and Node.js.",
    location: "Jakarta, Indonesia",
    job_type: APP_CONFIG.JOB_TYPES.FULL_TIME,
    created_by_id: "1",
  },
];

// Generate static params for all known job IDs
export async function generateStaticParams() {
  // Try to fetch job IDs from the database first
  try {
    const { data } = await supabase
      .from("jobs")
      .select("id");

    if (!data || data.length === 0) {
      // If no data from database, use dummy job IDs
      return dummyJobs.map((job) => ({
        id: job.id.toString(),
      }));
    }

    return data.map((job) => ({
      id: job.id.toString(),
    }));
  } catch {
    // Fallback to dummy job IDs if database is not available
    return dummyJobs.map((job) => ({
      id: job.id.toString(),
    }));
  }
}

// Server component to fetch job data
async function getJob(id: string): Promise<Job | null> {
  try {
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) {
      // If no data from database, try to find in dummy data
      const dummyJob = dummyJobs.find(job => job.id.toString() === id);
      return dummyJob || null;
    }

    return data;
  } catch {
    // Fallback to dummy data if database is not available
    const dummyJob = dummyJobs.find(job => job.id.toString() === id);
    return dummyJob || null;
  }
}

export default async function JobDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full py-8 px-10 gap-6">
      <BackHeader label="Back to Results" />
      <div className="flex flex-row w-full gap-6">
        <div className="flex flex-col gap-4">
          <CompanyLogoInitial
            companyName="Reno Technologies, LLC"
            width={200}
            height={200}
          />
          <ApplyButton jobId={job.id} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-2 items-center justify-between">
            <h1 className="text-4xl font-bold">{job.title}</h1>
            <JobTypeBadge jobType={job.job_type || APP_CONFIG.DEFAULTS.JOB_TYPE} />
          </div>
          <p className="text-lg text-tertiary font-semibold">
            {job.company_name} - {job.location}
          </p>
          <p className="text-lg text-disabled font-semibold">
            Posted {formatDistanceToNow(job.created_at)} ago
          </p>
          <div className="flex flex-col gap-2 mt-10">
            <h2 className="text-2xl font-bold">About the Job</h2>
            <p className="text-base text-primary font-medium">
              {job.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
