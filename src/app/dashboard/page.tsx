"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import Button from "@/components/Button";
import { Plus } from "feather-icons-react";
import SearchBar from "@/components/SearchBar";
import JobModal from "@/components/JobModal";
import { Job } from "@/api/types";
import SearchResults from "@/components/SearchResults";
import { supabase } from "@/lib/supabaseClient";
import DialogModal from "@/components/DialogModal";
import { ITEMS_PER_PAGE, APP_CONFIG } from "@/lib/config";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobModalMode, setJobModalMode] = useState<"create" | "edit">("create");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");

  // Form state for job modal
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [jobType, setJobType] = useState<
    "full-time" | "part-time" | "contract"
  >(APP_CONFIG.DEFAULTS.JOB_TYPE);
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Redirect to home if not authenticated
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleCreateNewJob = () => {
    setShowJobModal(true);
    setSelectedJob(null);
    setJobModalMode("create");
    // Reset form fields
    setTitle("");
    setCompanyName(user?.user_metadata?.company_name || "");
    setCity("");
    setCountry("");
    setJobType(APP_CONFIG.DEFAULTS.JOB_TYPE);
    setDescription("");
  };

  const handleEditJob = (job: Job) => {
    setShowJobModal(true);
    setJobModalMode("edit");
    setSelectedJob(job);
    // Set form fields with job data
    setTitle(job.title || "");
    setCompanyName(job.company_name || user?.user_metadata?.company_name || "");
    setCity(job.location?.split(",")[0] || "");
    setCountry(job.location?.split(",")[1] || "");
    setJobType(job.job_type || APP_CONFIG.DEFAULTS.JOB_TYPE);
    setDescription(job.description || "");
  };

  const handleDeleteJob = (job: Job) => {
    setShowDeleteModal(true);
    setSelectedJob(job);
  };

  const handleConfirmDeleteJob = async () => {
    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", selectedJob?.id);
    if (error) {
      setError(error.message);
      alert("Error deleting job");
    } else {
      setError(null);
      alert("Job deleted successfully");
      fetchJobs();
    }
    setShowDeleteModal(false);
  };

  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in to create or edit jobs");
      return;
    }

    setIsSaving(true);

    try {
      console.log("User:", await supabase.auth.getUser());
      if (jobModalMode === "create") {
        const jobData = {
          title,
          company_name: companyName,
          location: `${city}, ${country}`,
          job_type: jobType,
          description,
          created_by_id: user.id,
        };

        console.log("Attempting to insert job data:", jobData);

        const { data, error } = await supabase.from("jobs").insert(jobData);

        if (error) {
          console.error("Error creating job:", error);
          console.error("Error details:", {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
          });

          if (error.message.includes("row-level security policy")) {
            alert(
              "Permission denied. Please check your account permissions or contact support."
            );
          } else {
            alert(`Failed to create job: ${error.message}`);
          }
        } else {
          console.log("Job created successfully:", data);
          alert("Job created successfully");
          setShowJobModal(false);
          fetchJobs();
        }
      } else {
        const { data, error } = await supabase
          .from("jobs")
          .update({
            title,
            company_name: companyName,
            location: `${city}, ${country}`,
            job_type: jobType,
            description,
          })
          .eq("id", selectedJob?.id || "");

        if (error) {
          console.error("Error updating job:", error);
          if (error.message.includes("row-level security policy")) {
            alert("Permission denied. You can only edit jobs you created.");
          } else {
            alert(`Failed to edit job: ${error.message}`);
          }
        } else {
          alert("Job edited successfully");
          setShowJobModal(false);
          fetchJobs();
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseJobModal = () => {
    setShowJobModal(false);
    // Reset form fields
    setTitle("");
    setCompanyName("");
    setCity("");
    setCountry("");
    setJobType(APP_CONFIG.DEFAULTS.JOB_TYPE);
    setDescription("");
  };

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
        .select("*", { count: "exact", head: true })
        .eq("created_by_id", user?.id);

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
        .eq("created_by_id", user?.id)
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
        setJobs(data.length > 0 ? data : []);
        setError(null);
      }
      setLoading(false);
    },
    [user]
  );

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Create form data and handlers objects
  const formData = {
    title,
    companyName,
    city,
    country,
    jobType,
    description,
  };

  const formHandlers = {
    setTitle,
    setCompanyName,
    setCity,
    setCountry,
    setJobType,
    setDescription,
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  function handleSearch(
    searchTerm: string,
    jobTypeFilter: string,
    locationFilter: string
  ): void {
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

  return (
    <>
      <div className="flex flex-col w-full min-h-screen py-6 sm:py-8 px-4 sm:px-10 gap-6 sm:gap-10 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Hello, {user?.user_metadata?.company_name}!
          </h1>
          <Button
            type="gradient"
            onClick={handleCreateNewJob}
            icon={<Plus className="w-4 h-4 text-white" />}
            label="Create New Job"
          />
        </div>

        <div className="flex flex-col gap-4">
          <SearchBar hasFilters onSearch={handleSearch} />
          <SearchResults
            jobs={jobs}
            loading={loading}
            error={error}
            isDashboard
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
      {showJobModal && (
        <JobModal
          onClose={handleCloseJobModal}
          mode={jobModalMode}
          job={selectedJob}
          formData={formData}
          formHandlers={formHandlers}
          onSave={handleSave}
          isLoading={isSaving}
        />
      )}
      {showDeleteModal && (
        <DialogModal
          confirmLabel="Delete"
          onConfirm={handleConfirmDeleteJob}
          onCancel={() => setShowDeleteModal(false)}
          title="Are you sure want to deelete this job?"
          content={selectedJob?.title || ""}
        />
      )}
    </>
  );
}
