import Button from "@/components/Button";

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const handlePageChange = (page: number) => {
    // Ensure page is within valid range
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleInputChange = (value: string) => {
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 items-center justify-center sm:justify-end">
      <div className="flex gap-3 items-center">
        <Button 
          label="Previous" 
          type="primary" 
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isFirstPage}
        />
        <Button 
          label="Next" 
          type="primary" 
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLastPage}
        />
      </div>
      <div className="flex items-center gap-3">
        <input
          maxLength={totalPages.toString().length}
          type="number"
          min="1"
          max={totalPages}
          className="w-20 sm:w-16 px-3 py-3 sm:py-2 text-base font-medium text-tertiary text-center border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={currentPage}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <span className="text-base font-medium">of</span>
        <span className="text-base font-medium text-tertiary">{totalPages}</span>
      </div>
    </div>
  );
}
