import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "feather-icons-react";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  disabled?: boolean;
}

export default function Dropdown({
  label,
  placeholder = "Select an option",
  value,
  onChange,
  options,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 w-[200px]">
      <label className="text-base font-semibold">{label}</label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className={`w-full px-3 py-2 text-left border border-primary rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-tertiary ${
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-400"
          }`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className={selectedOption ? "text-primary" : "text-primary"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown
              className={`w-6 h-6 text-primary transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </span>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-disabled rounded-md shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`w-full px-3 py-2 text-left hover:bg-disabled hover:text-white focus:bg-tertiary focus:outline-none ${
                  option.value === value ? "bg-tertiary text-white" : "text-primary"
                }`}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 