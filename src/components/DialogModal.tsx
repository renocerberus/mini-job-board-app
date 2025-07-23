import Modal from "@/components/Modal";
import Button from "@/components/Button";
import CloseButton from "@/components/CloseButton";

export default function DialogModal({
  onConfirm,
  onCancel,
  title,
  content,
  confirmLabel = "Yes",
}: {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  content: string;
  confirmLabel?: string;
}) {
  return (
    <Modal onClose={onCancel}>
      <div className="flex flex-col w-full max-w-lg h-auto gap-6 bg-white p-6 rounded-lg self-center">
        <CloseButton type="primary" onClick={onCancel} />
        <div className="flex flex-col gap-8 w-full p-4 justify-between items-center">
          <div className="flex flex-col gap-4 w-full items-center">
            <h1 className="text-lg sm:text-xl lg:text-2xl text-center font-bold">{title}</h1>
            <p className="text-base sm:text-lg font-semibold text-tertiary text-center leading-relaxed">{content}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button type="primary" onClick={onConfirm} label={confirmLabel} />
            <Button type="outline" onClick={onCancel} label="Cancel" />
          </div>
        </div>
      </div>
    </Modal>
  );
}
