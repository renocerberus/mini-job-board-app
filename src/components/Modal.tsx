export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-20 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="flex flex-col w-full max-w-5xl max-h-[85vh] h-full rounded-lg overflow-hidden"
        onClick={handleModalClick}
      >
        {children}
      </div>
    </div>
  );
}
