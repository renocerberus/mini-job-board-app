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
      <div className="flex flex-col w-1/2 h-2/3 gap-4 bg-white p-4">
        <CloseButton type="primary" onClick={onCancel} />
        <div className="flex flex-col gap-8 w-full h-full p-6 justify-between items-center">
        <div className="flex flex-col gap-2 w-full h-full items-center mt-10">
          <h1 className="text-xl text-center">{title}</h1>
          <p className="text-xl font-semibold text-tertiary text-center">{content}</p>
        </div>
        <div className="flex flex-col gap-2 w-full h-fit">
          <Button type="primary" onClick={onConfirm} label={confirmLabel} />
          <Button type="outline" onClick={onCancel} label="Cancel" />
        </div>
        </div>
      </div>
    </Modal>
  );
}
