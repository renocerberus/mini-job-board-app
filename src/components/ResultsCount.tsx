import { Job } from "@/api/types";

export default function ResultsCount({ jobs }: { jobs: Job[] }) {
  return (
    <p className="text-base font-medium">
      Job results found:{" "}
      <span className="font-semibold text-tertiary">{jobs.length}</span>
    </p>
  );
}
