import { showPlaceholders } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Marks content that needs verified information from Cole. It is deliberately
 * visible in development so nothing unconfirmed can ship looking like a real claim, and renders nothing on the
 * live site (see `showPlaceholders`).
 */
export function Placeholder({
  children,
  tone = "light",
  className,
  inline = false,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
  inline?: boolean;
}) {
  if (!showPlaceholders) return null;
  const Tag = inline ? "span" : "div";
  return (
    <Tag
      data-placeholder
      className={cn(
        "rounded-md border border-dashed px-3 py-2 text-[0.9rem] leading-snug",
        inline && "inline-block py-0.5",
        tone === "light" ? "border-steel/60 bg-fog/60 text-steel" : "border-silver/40 bg-white/[0.04] text-silver",
        className,
      )}
    >
      <span className="font-semibold">To confirm: </span>
      {children}
    </Tag>
  );
}
