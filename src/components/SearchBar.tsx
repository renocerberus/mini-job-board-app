import { useState, useEffect } from "react";
import { Search } from "feather-icons-react";
import Button from "@/components/Button";
import Filter from "@/components/Filter";
import { useRouter } from "next/navigation";

export default function SearchBar({
  hasFilters,
  isRedirect = false,
  onSearch,
}: {
  hasFilters: boolean;
  isRedirect?: boolean;
  onSearch?: (
    searchTerm: string,
    jobTypeFilter: string,
    locationFilter: string
  ) => void;
}) {
  const router = useRouter();
  
  // Initialize state with localStorage values to prevent reset on re-render
  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("searchTerm") || "";
    }
    return "";
  });
  const [jobTypeFilter, setJobTypeFilter] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("jobTypeFilter") || "";
    }
    return "";
  });
  const [locationFilter, setLocationFilter] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("locationFilter") || "";
    }
    return "";
  });

  // Save values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("jobTypeFilter", jobTypeFilter);
  }, [jobTypeFilter]);

  useEffect(() => {
    localStorage.setItem("locationFilter", locationFilter);
  }, [locationFilter]);

  // Clear localStorage when component unmounts (when navigating to another page)
  useEffect(() => {
    return () => {
      localStorage.removeItem("searchTerm");
      localStorage.removeItem("jobTypeFilter");
      localStorage.removeItem("locationFilter");
    };
  }, []);

  const handleClear = () => {
    setSearchTerm("");
    setJobTypeFilter("");
    setLocationFilter("");
    // Clear localStorage values
    localStorage.removeItem("searchTerm");
    localStorage.removeItem("jobTypeFilter");
    localStorage.removeItem("locationFilter");
  };

  const handleSearch = () => {
    if (isRedirect) {
      router.push(
        `/jobs?search=${searchTerm}&jobType=${jobTypeFilter}&location=${locationFilter}`
      );
    }

    onSearch?.(searchTerm, jobTypeFilter, locationFilter);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Search Input - Mobile: Stack vertically, Desktop: Horizontal */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full border-2 border-primary rounded-xl p-3 sm:p-4 bg-white">
        <div className="flex items-center gap-3 flex-1">
          <Search className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by job title or company name.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-tertiary focus:outline-none text-base sm:text-lg h-10 sm:h-12"
          />
        </div>
        <div className="flex gap-3 sm:flex-shrink-0">
          <Button label="Clear" type="text-only" onClick={handleClear} />
          <Button label="Search" type="primary" onClick={handleSearch} />
        </div>
      </div>
      
      {/* Filters - Stack vertically on mobile */}
      {hasFilters && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
          <Filter
            type="job-type"
            value={jobTypeFilter}
            onChange={setJobTypeFilter}
          />
          <Filter
            type="location"
            value={locationFilter}
            onChange={setLocationFilter}
          />
        </div>
      )}
    </div>
  );
}
