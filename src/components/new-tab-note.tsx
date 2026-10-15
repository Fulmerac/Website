/** Screen-reader note for links that open the Google Form in a new tab. */
export function NewTabNote({ show }: { show: boolean }) {
  return show ? <span className="sr-only"> (opens Google Forms in a new tab)</span> : null;
}
