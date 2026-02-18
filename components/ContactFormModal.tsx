"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import MultiSelect from "./MultiSelect";
import Button from "./Button";
import Image from "next/image";
import { useParams } from "next/navigation";
import emailjs from "@emailjs/browser";

type Option = { label: string; value: string };

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormState = {
  full_name: string;
  email_address: string;
  company_name: string;
  industry: Option[]; // MultiSelect (array). If your MultiSelect is single-select, change to Option | null.
  job_role: string;
  country: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
// Optional, only if you later need it
// const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactFormModal({ open, onClose }: Props) {
  const params = useParams();
  const t = useTranslations("contact");

  const industryOptions = t.raw("industry_options") as Option[];

  const [form, setForm] = useState<FormState>({
    full_name: "",
    email_address: "",
    company_name: "",
    industry: [],
    job_role: "",
    country: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const isRtl = useMemo(() => params?.locale === "ar", [params]);

  if (!open) return null;

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error as user fixes input
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};

    if (!form.full_name.trim()) next.full_name = t("error_required");
    if (!form.email_address.trim()) next.email_address = t("error_required");
    else if (!emailRegex.test(form.email_address.trim()))
      next.email_address = t("error_invalid_email");

    if (!form.company_name.trim()) next.company_name = t("error_required");

    if (!form.industry || form.industry.length === 0)
      next.industry = t("error_required");

    if (!form.job_role.trim()) next.job_role = t("error_required");
    if (!form.country.trim()) next.country = t("error_required");

    if (!form.message.trim()) next.message = t("error_required");
    else if (form.message.trim().length < 10)
      next.message = t("error_message_too_short"); // optional rule

    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      return;
    }

    setSubmitting(true);
    try {
      // Convert MultiSelect selections to a string for email
      const industryText = form.industry.map((o) => o.label).join(", ");

      const templateParams = {
        full_name: form.full_name.trim(),
        email_address: form.email_address.trim(),
        company_name: form.company_name.trim(),
        industry: industryText,
        job_role: form.job_role.trim(),
        country: form.country.trim(),
        message: form.message.trim(),
      };

      // If your setup truly does not require a public key, this call can work as-is in your environment.
      // If it fails with an auth error, add emailjs.init(PUBLIC_KEY) once OR pass { publicKey } as 4th param.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
        },
      );

      setForm({
        full_name: "",
        email_address: "",
        company_name: "",
        industry: [],
        job_role: "",
        country: "",
        message: "",
      });
      setErrors({});

      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-200 overflow-hidden"
      onClick={onClose}
    >
      <div
        className="bg-white relative rounded-3xl p-6 w-[90%] md:max-w-3xl shadow-xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>

        <div className={`absolute top-6 ${isRtl ? "left-5" : "right-5"}`}>
          <Image
            src={"/icons/cross-icon.svg"}
            alt="cross-icon"
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center justify-center"
        >
          {/* Full name */}
          <div>
            <input
              name="full_name"
              type="text"
              value={form.full_name}
              onChange={(e) => setField("full_name", e.target.value)}
              placeholder={t("name_placeholder")}
              className={`bg-primary/10 border rounded-lg px-4 py-2.5 text-black placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 w-full ${
                errors.full_name ? "border-red-400" : "border-black/20"
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <input
              name="email_address"
              type="email"
              value={form.email_address}
              onChange={(e) => setField("email_address", e.target.value)}
              placeholder={t("email_placeholder")}
              className={`bg-primary/10 border rounded-lg px-4 py-2.5 text-black placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 w-full ${
                errors.email_address ? "border-red-400" : "border-black/20"
              }`}
            />
          </div>

          {/* Company */}
          <div>
            <input
              name="company_name"
              type="text"
              value={form.company_name}
              onChange={(e) => setField("company_name", e.target.value)}
              placeholder={t("company_placeholder")}
              className={`bg-primary/10 border rounded-lg px-4 py-2.5 text-black placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 w-full ${
                errors.company_name ? "border-red-400" : "border-black/20"
              }`}
            />
          </div>

          {/* Industry (MultiSelect) */}
          <div>
            <MultiSelect
              placeholder={t("industry_placeholder")}
              options={industryOptions}
              value={form.industry}
              onChange={(selected: Option[]) => setField("industry", selected)}
              error={Boolean(errors.industry)}
            />
          </div>

          {/* Job role */}
          <div>
            <input
              name="job_role"
              type="text"
              value={form.job_role}
              onChange={(e) => setField("job_role", e.target.value)}
              placeholder={t("job_role_placeholder")}
              className={`bg-primary/10 border rounded-lg px-4 py-2.5 text-black placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 w-full ${
                errors.job_role ? "border-red-400" : "border-black/20"
              }`}
            />
          </div>

          {/* Country */}
          <div>
            <input
              name="country"
              type="text"
              value={form.country}
              onChange={(e) => setField("country", e.target.value)}
              placeholder={t("country_placeholder")}
              className={`bg-primary/10 border rounded-lg px-4 py-2.5 text-black placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 w-full ${
                errors.country ? "border-red-400" : "border-black/20"
              }`}
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <textarea
              name="message"
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
              placeholder={t("message_placeholder")}
              className={`bg-primary/10 border rounded-lg px-4 py-2.5 text-black placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 w-full h-24 ${
                errors.message ? "border-red-400" : "border-black/20"
              }`}
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <Button
              text={t("submit_button")}
              variant="contained"
              className="w-full"
              type="submit"
              disabled={submitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
