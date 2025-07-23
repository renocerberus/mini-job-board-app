import { X } from "feather-icons-react";

export default function CloseButton({
  type = "primary",
  onClick,
}: {
  type?: "primary" | "white";
  onClick: () => void;
}) {
  const color = type === "primary" ? "text-primary" : "text-white";
  return (
    <div
      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer absolute self-end hover:bg-gray-100 transition-colors"
      onClick={onClick}
    >
      <X className={`w-6 h-6 sm:w-8 sm:h-8 ${color}`} />
    </div>
  );
}
