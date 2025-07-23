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
    <div className="flex flex-row gap-2 items-center justify-end">
      <Button 
        label="Previous" 
        type="primary" 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
      />
      <input
        maxLength={totalPages.toString().length}
        type="number"
        min="1"
        max={totalPages}
        className="w-14 px-2 py-1 text-base font-medium text-tertiary text-center border border-primary rounded-md"
        value={currentPage}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <span className="text-base font-medium">of</span>
      <span className="text-base font-medium text-tertiary">{totalPages}</span>
      <Button 
        label="Next" 
        type="primary" 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
      />
    </div>
  );
}
