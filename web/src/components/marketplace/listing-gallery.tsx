'use client';

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ListingGallery({ photos, title }: { photos: string[]; title: string }) {
  const [active, setActive] = useState(0);

  function prev() {
    setActive((i) => (i === 0 ? photos.length - 1 : i - 1));
  }
  function next() {
    setActive((i) => (i === photos.length - 1 ? 0 : i + 1));
  }

  return (
    <div>
      <div className="relative aspect-video sm:aspect-video rounded-lg overflow-hidden bg-neutral-100">
        <Image src={photos[active]} alt={title} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" priority />

        {photos.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous photo" className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} aria-label="Next photo" className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white">
              <ChevronRight size={18} />
            </button>
            <span className="absolute bottom-3 right-3 text-xs bg-black/70 text-white rounded-full px-2.5 py-1">
              {active + 1} / {photos.length}
            </span>
          </>
        )}
      </div>

      {photos.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {photos.map((photo, i) => (
            <button
              key={photo}
              onClick={() => setActive(i)}
              className={cn(
                'relative shrink-0 h-16 w-20 rounded-lg overflow-hidden border-2',
                i === active ? 'border-neutral-800' : 'border-transparent'
              )}
            >
              <Image src={photo} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}