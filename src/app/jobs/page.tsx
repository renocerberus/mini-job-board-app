"use client";

import { supabase } from "@/lib/supabaseClient";
import { useCallback, useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import { Job } from "@/api/types";
import { ITEMS_PER_PAGE, APP_CONFIG } from "@/lib/config";

const dummyJobs: Job[] = [
  {
    id: 1,
    created_at: 1753247057,
    title: "Software Engineer",
    company_name: "Reno Technologies, LLC",
    description:
      "We are looking for a software engineer with 3 years of experience in React and Node.js.",
    location: "Jakarta, Indonesia",
    job_type: APP_CONFIG.JOB_TYPES.FULL_TIME,
    created_by_id: "1",
  },
  {
    id: 2,
    created_at: 1753247057,
    title: "Software Engineer",
    company_name: "Reno Technologies, LLC",
    description:
      "We are looking for a software engineer with 3 years of experience in React and Node.js.",
    location: "Jakarta, Indonesia",
    job_type: APP_CONFIG.JOB_TYPES.PART_TIME,
    created_by_id: "1",
  },
  {
    id: 3,
    created_at: 1753247057,
    title: "Software Engineer",
    company_name: "Reno Technologies, LLC",
    description:
      "We are looking for a software engineer with 3 years of experience in React and Node.js.",
    location: "Jakarta, Indonesia",
    job_type: APP_CONFIG.JOB_TYPES.CONTRACT,
    created_by_id: "1",
  },
  {
    id: 4,
    created_at: 1753247057,
    title: "Software Engineer",
    company_name: "Reno Technologies, LLC",
    description:
      "We are looking for a software engineer with 3 years of experience in React and Node.js.",
    location: "Jakarta, Indonesia",
    job_type: APP_CONFIG.JOB_TYPES.FULL_TIME,
    created_by_id: "1",
  },
  {
    id: 5,
    created_at: 1753247057,
    title: "Software Engineer",
    company_name: "Reno Technologies, LLC",
    description:
      "We are looking for a software engineer with 3 years of experience in React and Node.js.",
    location: "Jakarta, Indonesia",
    job_type: APP_CONFIG.JOB_TYPES.FULL_TIME,
    created_by_id: "1",
  },
];

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");

  const fetchJobs = useCallback(
    async (
      searchTerm?: string,
      jobTypeFilter?: string,
      locationFilter?: string,
      page: number = 1
    ) => {
      setLoading(true);
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      // First, get the total count for pagination
      let countQuery = supabase
        .from("jobs")
        .select("*", { count: "exact", head: true });

      // Add search term filter to count query
      if (searchTerm && searchTerm.trim()) {
        countQuery = countQuery.or(
          `title.ilike.%${searchTerm}%,company_name.ilike.%${searchTerm}%`
        );
      }

      // Add job type filter to count query
      if (jobTypeFilter && jobTypeFilter !== "all") {
        countQuery = countQuery.eq("job_type", jobTypeFilter);
      }

      // Add location filter to count query
      if (locationFilter && locationFilter.trim()) {
        countQuery = countQuery.ilike("location", `%${locationFilter}%`);
      }

      const { count } = await countQuery;
      setTotalCount(count || 0);

      // Now get the paginated data
      let query = supabase
        .from("jobs")
        .select("*")
        .range(from, to)
        .order("created_at", { ascending: false });

      // Add search term filter
      if (searchTerm && searchTerm.trim()) {
        query = query.or(
          `title.ilike.%${searchTerm}%,company_name.ilike.%${searchTerm}%`
        );
      }

      // Add job type filter
      if (jobTypeFilter && jobTypeFilter !== "all") {
        query = query.eq("job_type", jobTypeFilter);
      }

      // Add location filter
      if (locationFilter && locationFilter.trim()) {
        query = query.ilike("location", `%${locationFilter}%`);
      }

      const { data, error } = await query;
      if (error) {
        setError(error.message);
      } else {
        // If no data from API, use dummy data for demo purposes
        setJobs(data.length > 0 ? data : dummyJobs);
        setError(null);
      }
      setLoading(false);
    },
    []
  );

  function handleSearch(
    searchTerm: string,
    jobTypeFilter: string,
    locationFilter: string
  ): void {
    console.log("Searching with:", {
      searchTerm,
      jobTypeFilter,
      locationFilter,
    });
    setSearchTerm(searchTerm);
    setJobTypeFilter(jobTypeFilter);
    setLocationFilter(locationFilter);
    setCurrentPage(1);
    fetchJobs(searchTerm, jobTypeFilter, locationFilter, 1);
  }

  function handlePageChange(page: number): void {
    setCurrentPage(page);
    fetchJobs(searchTerm, jobTypeFilter, locationFilter, page);
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="font-sans min-h-screen bg-white">
      <main className="flex flex-col">
        <div className="flex flex-col w-full bg-gradient-to-r from-tertiary to-primary">
          <div className="flex flex-col w-full py-6 sm:py-8 px-4 sm:px-10">
            <SearchBar hasFilters onSearch={handleSearch} />
          </div>
        </div>
        <SearchResults 
          jobs={jobs} 
          loading={loading} 
          error={error}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </main>
    </div>
  );
}
