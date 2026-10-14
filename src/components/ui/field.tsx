import { cn } from "@/lib/utils";

const control =
  "block w-full rounded-lg border border-black/20 bg-white px-4 text-base text-ink placeholder:text-steel transition-colors hover:border-black/40 focus:border-black focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black aria-[invalid=true]:border-error";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(control, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(control, "min-h-36 py-3 leading-relaxed", className)} {...props} />;
}

export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(control, "h-12 appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-steel"
      >
        <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("block text-[0.95rem] font-semibold text-ink", className)} {...props} />;
}

export function Optional() {
  return <span className="ml-1 font-normal text-steel">(optional)</span>;
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-error">
      {message}
    </p>
  );
}

/** A large tappable row for radio buttons and checkboxes. */
export function Choice({
  label,
  className,
  ...props
}: React.ComponentProps<"input"> & { label: string }) {
  return (
    <label
      className={cn(
        "flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-black/15 bg-white px-4 py-3 transition-colors hover:border-black/40 has-[:checked]:border-black has-[:checked]:bg-fog has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-black",
        className,
      )}
    >
      <input className="size-[1.125rem] shrink-0 accent-black focus:outline-none" {...props} />
      <span className="text-[0.95rem] leading-snug">{label}</span>
    </label>
  );
}
