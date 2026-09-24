import { useRef } from "react";
import { ImagePlus, X, Star } from "lucide-react";

/**
 * Controlled image uploader.
 * value: array of { id, url, file? } — items with `file` are pending uploads,
 *        items without `file` already have a remote `url`.
 */
export default function ImageUploader({ value = [], onChange, multiple = false, label, hint }) {
  const inputRef = useRef(null);

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    const items = files.map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      file,
    }));
    onChange(multiple ? [...value, ...items] : items.slice(0, 1));
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (id) => {
    onChange(value.filter((item) => item.id !== id));
  };

  return (
    <div>
      {label && <p className="text-xs font-semibold text-navy-600 dark:text-white/60">{label}</p>}

      <div className="mt-2 flex flex-wrap gap-3">
        {value.map((item, idx) => (
          <div key={item.id} className="group relative h-24 w-32 overflow-hidden rounded-xl border border-navy-950/10 dark:border-white/10">
            <img src={item.url} alt="" className="h-full w-full object-cover" />
            {multiple && idx === 0 && (
              <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-navy-950/80 px-2 py-0.5 text-[10px] font-semibold text-white">
                <Star className="h-2.5 w-2.5 fill-gold-400 text-gold-400" />
                Cover
              </span>
            )}
            <button
              type="button"
              onClick={() => remove(item.id)}
              aria-label="Remove image"
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-navy-800 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {(multiple || value.length === 0) && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-24 w-32 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-navy-950/15 text-navy-500 hover:border-gold-400 hover:text-gold-600 dark:border-white/15 dark:text-white/50"
          >
            <ImagePlus className="h-5 w-5" />
            <span className="text-xs font-semibold">{value.length ? "Add More" : "Upload"}</span>
          </button>
        )}
      </div>

      {hint && <p className="mt-2 text-xs text-navy-400 dark:text-white/40">{hint}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
    </div>
  );
}
