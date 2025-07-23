"use client";

import BackHeader from "@/components/BackHeader";
import Button from "@/components/Button";
import CompanyLogoInitial from "@/components/CompanyLogoInitial";
import JobTypeBadge from "@/components/JobTypeBadge";
import { Send } from "feather-icons-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Job } from "@/api/types";
import { supabase } from "@/lib/supabaseClient";
import { formatDistanceToNow } from "date-fns";
import { APP_CONFIG } from "@/lib/config";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching job:", error);
        } else {
          setJob(data);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full py-8 px-10 gap-6">
        <BackHeader label="Back to Results" />
        <div className="flex flex-row w-full justify-center items-center gap-6">
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      </div>
    );
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
          <Button
            label="Apply Now"
            type="gradient"
            onClick={() => {}}
            icon={<Send className="w-4 h-4 text-white" />}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-2 items-center justify-between">
            <h1 className="text-4xl font-bold">{job?.title}</h1>
            <JobTypeBadge jobType={job?.job_type || APP_CONFIG.DEFAULTS.JOB_TYPE} />
          </div>
          <p className="text-lg text-tertiary font-semibold">
            {job?.company_name} - {job?.location}
          </p>
          <p className="text-lg text-disabled font-semibold">
            Posted {formatDistanceToNow(job!.created_at)} ago
          </p>
          <div className="flex flex-col gap-2 mt-10">
            <h2 className="text-2xl font-bold">About the Job</h2>
            <p className="text-base text-primary font-medium">
              {job?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
