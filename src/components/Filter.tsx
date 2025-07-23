import { useState, useEffect } from "react";
import Dropdown from "@/components/Dropdown";
import { supabase } from "@/lib/supabaseClient";
import { APP_CONFIG } from "@/lib/config";

interface FilterProps {
  type: "job-type" | "location";
  value: string;
  onChange: (value: string) => void;
}

export default function Filter({ type, value, onChange }: FilterProps) {
  const [locationOptions, setLocationOptions] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const jobTypeOptions = [
    { label: "All Job Types", value: "" },
    { label: "Full-time", value: APP_CONFIG.JOB_TYPES.FULL_TIME },
    { label: "Part-time", value: APP_CONFIG.JOB_TYPES.PART_TIME },
    { label: "Contract", value: APP_CONFIG.JOB_TYPES.CONTRACT },
  ];

  useEffect(() => {
    if (type === "location") {
      fetchLocations();
    }
  }, [type]);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('location')
        .not('location', 'is', null);

      if (error) {
        console.error('Error fetching locations:', error);
        return;
      }

      // Extract unique locations and create options
      const uniqueLocations = [...new Set(data.map(job => job.location))].filter(Boolean);
      const locationOptions = [
        { label: "All Locations", value: "" },
        ...uniqueLocations.map(location => ({
          label: location,
          value: location
        }))
      ];

      setLocationOptions(locationOptions);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (type === "job-type") {
    return (
      <Dropdown
        label=""
        placeholder="All Job Types"
        value={value}
        onChange={onChange}
        options={jobTypeOptions}
        disabled={loading}
      />
    );
  }

  if (type === "location") {
    return (
      <Dropdown
        label=""
        placeholder="All Locations"
        value={value}
        onChange={onChange}
        options={locationOptions}
        disabled={loading}
      />
    );
  }

  return null;
}
