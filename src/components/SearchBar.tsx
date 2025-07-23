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
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row items-center gap-2 w-full border-2 border-primary rounded-xl p-2 bg-white">
        <Search className="w-8 h-8 text-primary" />
        <input
          type="text"
          placeholder="Search by job title or company name.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-tertiary focus:outline-none text-lg"
        />
        <Button label="Clear" type="text-only" onClick={handleClear} />
        <Button label="Search" type="primary" onClick={handleSearch} />
      </div>
      {hasFilters && (
        <div className="flex flex-row items-center gap-2 w-full">
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
