import { z } from "zod";

export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
] as const;

export const LICENSE_STATUS = [
  { value: "licensed", label: "Currently licensed" },
  { value: "interested", label: "Interested in becoming licensed" },
  { value: "in-progress", label: "Currently working toward licensing" },
  { value: "exploring", label: "Exploring the industry" },
] as const;

export const EXPERIENCE = [
  { value: "life-insurance", label: "Life insurance" },
  { value: "other-sales", label: "Other sales experience" },
  { value: "none", label: "No previous sales experience" },
] as const;

export const AVAILABILITY = [
  { value: "weekday-mornings", label: "Weekday mornings" },
  { value: "weekday-afternoons", label: "Weekday afternoons" },
  { value: "weekday-evenings", label: "Weekday evenings" },
  { value: "weekends", label: "Weekends" },
] as const;

const values = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

export const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter an email address like name@example.com."),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a 10-digit phone number."),
  state: z.enum(US_STATES, { message: "Choose the state you live in." }),
  licenseStatus: z.enum(values(LICENSE_STATUS), { message: "Choose your license status." }),
  experience: z.enum(values(EXPERIENCE), { message: "Choose your previous experience." }),
  motivation: z
    .string()
    .trim()
    .min(20, "Tell us a little more — a few sentences is plenty.")
    .max(2000, "Keep this under 2,000 characters."),
  availability: z
    .array(z.enum(values(AVAILABILITY)))
    .min(1, "Choose at least one time that works for a call."),
  availabilityNotes: z.string().trim().max(500).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Confirm we can contact you about your application." }),
  /** Honeypot: real people never see or fill this field. */
  company: z.string().max(0).optional().or(z.literal("")),
});

export type Application = z.infer<typeof applicationSchema>;

export const labelFor = <T extends readonly { value: string; label: string }[]>(
  opts: T,
  value: string,
) => opts.find((o) => o.value === value)?.label ?? value;
