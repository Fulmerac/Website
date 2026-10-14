import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Shows the original Secure Life Agency logo once `site.logo` is set.
 * Until then it falls back to the agency name set in the brand typeface —
 * a stand-in, not a replacement logo.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center", className)} aria-label={`${site.name} home`}>
      {site.logo ? (
        <Image
          src={site.logo.src}
          width={site.logo.width}
          height={site.logo.height}
          alt={site.name}
          priority
          className="h-9 w-auto"
        />
      ) : (
        <span className="text-[1.05rem] leading-none font-bold tracking-[-0.01em] [font-stretch:125%]">
          Secure Life Agency
        </span>
      )}
    </Link>
  );
}
