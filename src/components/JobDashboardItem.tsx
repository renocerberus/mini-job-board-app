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
    <div className="flex flex-row w-full p-4 border border-disabled rounded-xl justify-between hover:bg-gray-100 transition-all duration-300">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-base text-tertiary font-semibold">
          {job.company_name} - {job.location}
        </p>
      </div>
      <div className="flex flex-row gap-2">
        <Button
          label="Edit"
          icon={<Edit className="w-6 h-6 text-primary" />}
          type="text-only"
          onClick={() => onEdit(job)}
        />
        <Button
          label="Delete"
          icon={<Trash className="w-6 h-6 text-primary" />}
          type="text-only"
          onClick={() => onDelete(job)}
        />
      </div>
    </div>
  );
}
