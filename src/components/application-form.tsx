"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Choice, FieldError, Input, Label, Optional, Select, Textarea } from "@/components/ui/field";
import {
  applicationSchema,
  AVAILABILITY,
  EXPERIENCE,
  LICENSE_STATUS,
  US_STATES,
  type Application,
} from "@/lib/application";

type FormValues = Omit<Application, "consent"> & { consent: boolean };

export function ApplicationForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(applicationSchema) as never,
    mode: "onTouched",
    defaultValues: { availability: [], consent: false, company: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Your application didn't go through. Check your connection and try again.");
      }
      router.push("/thank-you");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Your application didn't go through. Try again.");
    }
  };

  const err = (name: keyof FormValues) => errors[name]?.message as string | undefined;
  const a11y = (name: keyof FormValues) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  const errorCount = Object.keys(errors as FieldErrors).length;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
      <p className="text-[0.95rem] text-steel">All fields are required unless marked optional.</p>

      <fieldset className="space-y-6">
        <legend className="heading mb-6 text-xl">About you</legend>

        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" autoComplete="name" className="mt-2" {...register("fullName")} {...a11y("fullName")} />
          <FieldError id="fullName-error" message={err("fullName")} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              className="mt-2"
              {...register("email")}
              {...a11y("email")}
            />
            <FieldError id="email-error" message={err("email")} />
          </div>
          <div>
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className="mt-2"
              {...register("phone")}
              {...a11y("phone")}
            />
            <FieldError id="phone-error" message={err("phone")} />
          </div>
        </div>

        <div>
          <Label htmlFor="state">State of residence</Label>
          <Select id="state" autoComplete="address-level1" className="mt-2" defaultValue="" {...register("state")} {...a11y("state")}>
            <option value="" disabled>Choose your state</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
          <FieldError id="state-error" message={err("state")} />
        </div>
      </fieldset>

      <ChoiceGroup legend="Life insurance license status" name="licenseStatus" error={err("licenseStatus")}>
        {LICENSE_STATUS.map((o) => (
          <Choice key={o.value} type="radio" value={o.value} label={o.label} {...register("licenseStatus")} />
        ))}
      </ChoiceGroup>

      <ChoiceGroup legend="Previous experience" name="experience" error={err("experience")}>
        {EXPERIENCE.map((o) => (
          <Choice key={o.value} type="radio" value={o.value} label={o.label} {...register("experience")} />
        ))}
      </ChoiceGroup>

      <div>
        <Label htmlFor="motivation" className="heading text-xl">Why are you interested?</Label>
        <p id="motivation-hint" className="mt-2 text-[0.95rem] text-steel">
          What draws you to this work, and what are you hoping to build? A few sentences is plenty.
        </p>
        <Textarea
          id="motivation"
          className="mt-3"
          {...register("motivation")}
          aria-invalid={errors.motivation ? true : undefined}
          aria-describedby={errors.motivation ? "motivation-hint motivation-error" : "motivation-hint"}
        />
        <FieldError id="motivation-error" message={err("motivation")} />
      </div>

      <ChoiceGroup
        legend="When are you available for an introductory call?"
        hint="Choose all that apply."
        name="availability"
        error={err("availability")}
        columns
      >
        {AVAILABILITY.map((o) => (
          <Choice key={o.value} type="checkbox" value={o.value} label={o.label} {...register("availability")} />
        ))}
      </ChoiceGroup>

      <div className="-mt-4">
        <Label htmlFor="availabilityNotes">
          Anything we should know about your schedule?<Optional />
        </Label>
        <Input id="availabilityNotes" className="mt-2" placeholder="e.g. after 6pm Eastern" {...register("availabilityNotes")} />
      </div>

      {/* Honeypot for bots. Hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div>
        <label className="flex cursor-pointer gap-3 text-[0.95rem] leading-snug">
          <input
            type="checkbox"
            className="mt-0.5 size-[1.125rem] shrink-0 accent-black"
            {...register("consent")}
            {...a11y("consent")}
          />
          <span>
            Secure Life Agency can contact me by phone, text, or email about my application. Message and data rates may
            apply.
          </span>
        </label>
        <FieldError id="consent-error" message={err("consent")} />
      </div>

      <div className="space-y-4">
        <div aria-live="polite" role="status">
          {serverError ? (
            <p className="rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-[0.95rem] text-error">{serverError}</p>
          ) : errorCount > 0 ? (
            <p className="text-[0.95rem] text-error">
              {errorCount === 1 ? "One field needs" : `${errorCount} fields need`} attention before you can submit.
            </p>
          ) : null}
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto sm:px-10">
          {isSubmitting ? "Submitting application…" : "Submit application"}
        </Button>
      </div>
    </form>
  );
}

function ChoiceGroup({
  legend,
  hint,
  name,
  error,
  columns,
  children,
}: {
  legend: string;
  hint?: string;
  name: string;
  error?: string;
  columns?: boolean;
  children: React.ReactNode;
}) {
  const describedBy = [hint && `${name}-hint`, error && `${name}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <fieldset aria-describedby={describedBy} aria-invalid={error ? true : undefined}>
      <legend className="heading text-xl">{legend}</legend>
      {hint ? <p id={`${name}-hint`} className="mt-2 text-[0.95rem] text-steel">{hint}</p> : null}
      <div className={`mt-4 grid gap-3 ${columns ? "sm:grid-cols-2" : ""}`}>{children}</div>
      <FieldError id={`${name}-error`} message={error} />
    </fieldset>
  );
}
