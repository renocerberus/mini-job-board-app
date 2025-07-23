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
      className="fixed inset-0 bg-black/50 flex justify-center z-20"
      onClick={handleBackdropClick}
    >
      <div
        className="flex flex-row w-1/2 max-h-[720px] h-full px-10 py-8 overflow-y-scroll justify-center"
        onClick={handleModalClick}
      >
        {children}
      </div>
    </div>
  );
}
