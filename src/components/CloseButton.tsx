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
      className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer absolute self-end"
      onClick={onClick}
    >
      <X className={`w-8 h-8 ${color}`} />
    </div>
  );
}
