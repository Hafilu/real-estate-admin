"use client";

export default function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 modal-backdrop" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-lg w-[min(96%,700px)] p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1">
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
