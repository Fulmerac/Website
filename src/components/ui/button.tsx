import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-semibold whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        /** On dark surfaces. */
        light: "bg-white text-black hover:bg-fog",
        /** On light surfaces. */
        dark: "bg-black text-white hover:bg-graphite",
        outlineLight: "border border-white/35 text-white hover:border-white hover:bg-white/5",
        outlineDark: "border border-black/25 text-black hover:border-black hover:bg-black/[0.03]",
      },
    },
    defaultVariants: { variant: "dark" },
  },
);

type Variant = VariantProps<typeof buttonVariants>["variant"];

export function Button({
  className,
  variant,
  ...props
}: React.ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}

export function ButtonLink({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={cn(buttonVariants({ variant }), className)} {...props} />;
}
