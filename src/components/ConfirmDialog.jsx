import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-navy-950/50" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-lifted animate-fade-up dark:bg-navy-900">
        <span className={`flex h-11 w-11 items-center justify-center rounded-full ${danger ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400" : "bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400"}`}>
          <AlertTriangle className="h-5.5 w-5.5" />
        </span>
        <h2 className="mt-4 font-display text-lg font-semibold text-navy-950 dark:text-white">{title}</h2>
        {description && <p className="mt-1.5 text-sm text-navy-600 dark:text-white/60">{description}</p>}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-full border border-navy-950/12 py-2.5 text-sm font-semibold text-navy-700 disabled:opacity-50 dark:border-white/15 dark:text-white/80"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 rounded-full py-2.5 text-sm font-semibold text-white disabled:opacity-50 ${
              danger ? "bg-red-600 hover:bg-red-700" : "bg-gold-500 text-navy-950 hover:bg-gold-600"
            }`}
          >
            {loading ? "Please wait…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
