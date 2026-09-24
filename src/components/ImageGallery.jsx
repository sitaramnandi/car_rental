import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery({ images = [], alt = "" }) {
  const list = images.length ? images : ["/placeholder-car.svg"];
  const [active, setActive] = useState(0);
  const maxThumbs = 4;

  const go = (dir) => setActive((i) => (i + dir + list.length) % list.length);

  return (
    <div>
      <div className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-navy-100 dark:bg-navy-800 sm:aspect-16/10">
        <img
          src={list[active]}
          alt={`${alt} — photo ${active + 1}`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/placeholder-car.svg";
          }}
          className="h-full w-full object-cover"
        />
        {list.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-soft opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 dark:bg-navy-950/80 dark:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow-soft opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 dark:bg-navy-950/80 dark:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-navy-950/70 px-2.5 py-1 text-xs font-medium text-white">
              {active + 1} / {list.length}
            </span>
          </>
        )}
      </div>

      {list.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2.5">
          {list.slice(0, maxThumbs).map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={`aspect-square overflow-hidden rounded-xl border-2 transition-colors ${
                active === i ? "border-gold-500" : "border-transparent"
              }`}
            >
              <img src={src} alt={`${alt} thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
          {list.length > maxThumbs && (
            <button
              type="button"
              onClick={() => setActive(maxThumbs)}
              className="relative aspect-square overflow-hidden rounded-xl border-2 border-transparent"
            >
              <img src={list[maxThumbs]} alt="More photos" className="h-full w-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center bg-navy-950/60 text-sm font-semibold text-white">
                +{list.length - maxThumbs}
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
