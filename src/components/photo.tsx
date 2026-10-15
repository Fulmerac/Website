import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A slot for real photography. Pass `src` once a photo exists in public/photos;
 * until then it shows what the shot should be, so nobody fills it with stock.
 */
export function Photo({
  src,
  alt,
  brief,
  caption,
  className,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src?: string;
  alt: string;
  brief: string;
  /** Shown under a real photo. */
  caption?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={cn("relative overflow-hidden rounded-sm bg-graphite", className)}>
      {src ? (
        <>
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover grayscale-[15%]" />
          {caption ? (
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pt-12 pb-4 text-[0.95rem] text-white">
              {caption}
            </figcaption>
          ) : null}
        </>
      ) : (
        <div className="absolute inset-0 flex items-end p-5">
          <svg aria-hidden viewBox="0 0 24 24" className="absolute top-5 left-5 size-6 text-silver/50">
            <rect x="3" y="6" width="18" height="13" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="12" cy="12.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M8.5 6l1.5-2h4l1.5 2" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <figcaption className="max-w-xs text-sm leading-snug text-silver">
            <span className="font-semibold text-white">Photo needed. </span>
            {brief}
          </figcaption>
        </div>
      )}
    </figure>
  );
}
