import { Job } from "@/api/types";

export default function ResultsCount({ jobs }: { jobs: Job[] }) {
  return (
    <p className="text-sm sm:text-base font-medium text-center sm:text-left">
      Job results found:{" "}
      <span className="font-semibold text-tertiary">{jobs.length}</span>
    </p>
  );
}
