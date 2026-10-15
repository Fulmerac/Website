import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Horizontal lockup of the Secure Life Agency mark and wordmark, for dark backgrounds. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-3", className)} aria-label={`${site.name} home`}>
      <Image src="/brand/mark-white.png" alt="" width={127} height={192} priority className="h-9 w-auto" />
      <Image
        src="/brand/wordmark-white.png"
        alt={site.name}
        width={764}
        height={64}
        priority
        className="h-[0.95rem] w-auto sm:h-[1.05rem]"
      />
    </Link>
  );
}

/** The full stacked logo, for the footer. */
export function LogoStacked({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-block", className)} aria-label={`${site.name} home`}>
      <Image src="/brand/logo-stacked-white.png" alt={site.name} width={693} height={600} className="h-24 w-auto" />
    </Link>
  );
}
