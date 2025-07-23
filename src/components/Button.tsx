"use client";

export default function Button({
  label,
  type,
  icon,
  onClick,
  disabled,
}: {
  label: string;
  type: "primary" | "outline" | "text-only" | "gradient";
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className={`min-w-24 sm:min-w-28 ${
        type === "primary"
          ? "bg-primary text-white hover:text-accent"
          : type === "outline"
          ? "bg-transparent text-primary border-2 border-primary"
          : type === "gradient"
          ? "bg-gradient-to-r from-primary to-secondary text-white hover:text-accent"
          : "bg-transparent text-primary"
      } px-4 sm:px-6 py-3 rounded-lg font-semibold cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex flex-row gap-2 items-center justify-center text-sm sm:text-base">
        {icon}
        {label}
      </div>
    </button>
  );
}
