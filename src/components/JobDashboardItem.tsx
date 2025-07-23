import { Job } from "@/api/types";
import Button from "./Button";
import { Edit, Trash } from "feather-icons-react";

export default function JobDashboardItem({
  job,
  onEdit,
  onDelete,
}: {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row w-full p-5 border border-disabled rounded-xl justify-between hover:bg-gray-100 transition-all duration-300 gap-4 sm:gap-0">
      <div className="flex flex-col gap-3 flex-1">
        <h1 className="text-xl sm:text-2xl font-bold leading-tight">{job.title}</h1>
        <p className="text-sm sm:text-base text-tertiary font-semibold">
          {job.company_name} - {job.location}
        </p>
      </div>
      <div className="flex flex-row gap-3 justify-center sm:justify-end">
        <Button
          label="Edit"
          icon={<Edit className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />}
          type="text-only"
          onClick={() => onEdit(job)}
        />
        <Button
          label="Delete"
          icon={<Trash className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />}
          type="text-only"
          onClick={() => onDelete(job)}
        />
      </div>
    </div>
  );
}
