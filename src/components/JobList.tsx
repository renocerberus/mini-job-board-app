import { Job } from "@/api/types";
import JobItem from "@/components/JobItem";
import JobDashboardItem from "./JobDashboardItem";

export default function JobList({
  jobs,
  loading,
  error,
  isDashboard,
  onEdit,
  onDelete,
}: {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  isDashboard?: boolean;
  onEdit?: (job: Job) => void;
  onDelete?: (job: Job) => void;
}) {
  if (loading) {
    return (
      <div className="flex flex-col w-full h-[200px] gap-4 items-center justify-center">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Loading jobs...</h3>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full h-[200px] gap-4 items-center justify-center">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Error: {error}</h3>
          </div>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col w-full h-[200px] gap-4 items-center justify-center">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">No jobs found</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 ${
        isDashboard ? "md:grid-cols-1" : "md:grid-cols-2"
      } w-full gap-4`}
    >
      {jobs.map((job) =>
        isDashboard ? (
          <JobDashboardItem
            key={job.id}
            job={job}
            onEdit={onEdit!}
            onDelete={onDelete!}
          />
        ) : (
          <JobItem key={job.id} job={job} />
        )
      )}
    </div>
  );
}
