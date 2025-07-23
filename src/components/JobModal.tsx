import { useMemo } from "react";
import Modal from "@/components/Modal";
import TextField from "@/components/TextField";
import Dropdown from "@/components/Dropdown";
import { useAuth } from "@/lib/authContext";
import CloseButton from "@/components/CloseButton";
import Button from "./Button";
import { Job } from "@/api/types";
import { APP_CONFIG } from "@/lib/config";

interface FormData {
  title: string;
  companyName: string;
  city: string;
  country: string;
  jobType: "full-time" | "part-time" | "contract";
  description: string;
}

interface FormHandlers {
  setTitle: (value: string) => void;
  setCompanyName: (value: string) => void;
  setCity: (value: string) => void;
  setCountry: (value: string) => void;
  setJobType: (value: "full-time" | "part-time" | "contract") => void;
  setDescription: (value: string) => void;
}

export default function JobModal({
  onClose,
  mode,
  job,
  formData,
  formHandlers,
  onSave,
  isLoading,
}: {
  onClose: () => void;
  mode: "create" | "edit";
  job: Job | null;
  formData: FormData;
  formHandlers: FormHandlers;
  onSave: () => Promise<void>;
  isLoading: boolean;
}) {
  const { user } = useAuth();

  const jobTypeOptions = [
    { label: "Full-Time", value: APP_CONFIG.JOB_TYPES.FULL_TIME },
    { label: "Part-Time", value: APP_CONFIG.JOB_TYPES.PART_TIME },
    { label: "Contract", value: APP_CONFIG.JOB_TYPES.CONTRACT },
  ];

  const modalTitle = useMemo(() => {
    return mode === "create" ? "Create New Job" : "Edit Job";
  }, [mode]);

  return (
    <Modal onClose={onClose}>
      <div className="w-full h-full bg-white flex flex-col gap-6 justify-between p-6 overflow-y-scroll">
        <CloseButton onClick={onClose} />
        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">{modalTitle}</h1>
          <div className="flex flex-col gap-6">
            <TextField
              label="Job Title"
              type="text"
              placeholder="Enter your job title"
              value={formData.title}
              onChange={formHandlers.setTitle}
            />
            <TextField
              label="Company Name"
              type="text"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={formHandlers.setCompanyName}
            />
            <TextField
              label="City"
              type="text"
              placeholder="Enter your city"
              value={formData.city}
              onChange={formHandlers.setCity}
            />
            <TextField
              label="Country"
              type="text"
              placeholder="Enter your country"
              value={formData.country}
              onChange={formHandlers.setCountry}
            />
            <Dropdown
              label="Job Type"
              placeholder="Select job type"
              value={formData.jobType}
              onChange={(value) =>
                formHandlers.setJobType(value as "full-time" | "part-time" | "contract")
              }
              options={jobTypeOptions}
            />
            <TextField
              label="Job Description"
              type="textarea"
              placeholder="Enter your job description"
              value={formData.description}
              onChange={formHandlers.setDescription}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              type="outline"
              label="Cancel"
              onClick={onClose}
              disabled={isLoading}
            />
            <Button
              type="primary"
              label={isLoading ? "Saving..." : "Save"}
              onClick={onSave}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
