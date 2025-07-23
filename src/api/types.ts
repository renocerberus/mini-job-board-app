export interface Job {
  id: number;
  created_at: number;
  title: string;
  company_name: string;
  description: string;
  location: string;
  job_type: "full-time" | "part-time" | "contract";
  created_by_id: string;
} 