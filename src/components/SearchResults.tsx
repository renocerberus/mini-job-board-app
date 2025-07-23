import Pagination from "@/components/Pagination";
import ResultsCount from "@/components/ResultsCount";
import JobList from "@/components/JobList";
import { Job } from "@/api/types";

export default function SearchResults({
  jobs,
  loading,
  error,
  isDashboard,
  onEdit,
  onDelete,
  onPageChange,
  currentPage = 1,
  totalPages = 1,
}: {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  isDashboard?: boolean;
  onEdit?: (job: Job) => void;
  onDelete?: (job: Job) => void;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
}) {
  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-col w-full py-8 px-10 gap-6">
      <ResultsCount jobs={jobs} />
      <JobList
        jobs={jobs}
        loading={loading}
        error={error}
        isDashboard={isDashboard}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      {totalPages > 1 && onPageChange && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
