// app/dashboard/add-goal/page.tsx
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  FiBriefcase,
  FiAlignLeft,
  FiDollarSign,
  FiClock,
  FiImage,
  FiPlus,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

interface GuideFormData {
  title: string;
  description: string;
  requiredSkills: string[];
  salaryRange: string;
  estimatedTime: string;
  imageUrl?: string;
}

const initialForm: GuideFormData = {
  title: "",
  description: "",
  requiredSkills: [],
  salaryRange: "",
  estimatedTime: "",
  imageUrl: "",
};

async function createGuide(payload: GuideFormData) {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  if (!token) {
    throw new Error("আপনার সেশন শেষ হয়ে গেছে। দয়া করে আবার লগইন করুন।");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to post career guide");
  }
  return data;
}

export default function AddGoalPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<GuideFormData>(initialForm);
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: createGuide,
    onSuccess: () => {
      setShowSuccess(true);
      setForm(initialForm);
      queryClient.invalidateQueries({ queryKey: ["explore-goals"] });

      setTimeout(() => {
        setShowSuccess(false);
        router.push("/dashboard/manage-goals");
      }, 2000);
    },
  });

  const handleChange = (field: keyof GuideFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !form.requiredSkills.includes(trimmed)) {
      setForm((prev) => ({ ...prev, requiredSkills: [...prev.requiredSkills, trimmed] }));
      if (errors.requiredSkills) setErrors((prev) => ({ ...prev, requiredSkills: "" }));
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((s) => s !== skill),
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.title.trim()) newErrors.title = "Role/title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (form.requiredSkills.length === 0) newErrors.requiredSkills = "Add at least one required skill";
    if (!form.salaryRange.trim()) newErrors.salaryRange = "Approximate salary range is required";
    if (!form.estimatedTime.trim()) newErrors.estimatedTime = "Estimated time to learn is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate(form);
  };

  const inputClasses = (fieldError: string | undefined) => `
    min-h-[44px] w-full rounded-xl border py-2.5 pl-10 pr-3
    text-sm outline-none transition-all duration-200
    font-medium text-slate-900 dark:text-white
    placeholder:text-slate-400 dark:placeholder:text-slate-500
    ${
      fieldError
        ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-red-900/50 dark:bg-red-950/30"
        : "border-slate-200/80 bg-slate-50/50 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:focus:border-indigo-400 dark:focus:bg-slate-900"
    }
  `;

  return (
    <div className="bg-slate-50 min-h-screen dark:bg-slate-950">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 sm:mb-8 border-b border-slate-200/80 pb-5 dark:border-slate-800">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Share a Career Guide
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Post a guide about a role — skills needed, salary range, and how long it takes to learn.
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 border border-emerald-200/80 shadow-xs dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50">
            <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="font-semibold">Success!</p>
              <p className="text-emerald-700 dark:text-emerald-400">Career guide posted successfully!</p>
            </div>
          </div>
        )}

        {mutation.isError && (
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800 border border-red-200/80 shadow-xs dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/50">
            <FiAlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
            <div>
              <p className="font-semibold">Error!</p>
              <p className="text-red-700 dark:text-red-400">{(mutation.error as Error).message}</p>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:gap-6 sm:p-8"
          noValidate
        >
          {/* Role/Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Role / Title
            </label>
            <div className="relative">
              <FiBriefcase className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-500 dark:text-indigo-400" />
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. Data Scientist"
                className={inputClasses(errors.title)}
              />
            </div>
            {errors.title && <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Description / Overview
            </label>
            <div className="relative">
              <FiAlignLeft className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-indigo-500 dark:text-indigo-400" />
              <textarea
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="What does this role involve? What should someone know before starting?"
                rows={5}
                className={`${inputClasses(errors.description)} resize-none`}
              />
            </div>
            {errors.description && (
              <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Required Skills - tag input */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Required Skills
            </label>

            {form.requiredSkills.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {form.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 rounded-lg border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/60 dark:text-indigo-300"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="rounded-sm p-0.5 hover:bg-indigo-200/50 dark:hover:bg-indigo-900/80 transition-colors"
                    >
                      <FiX className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Python, SQL, Statistics..."
                className={`${inputClasses(errors.requiredSkills)} !pl-3`}
              />
              <button
                type="button"
                onClick={addSkill}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50 text-indigo-600 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700"
              >
                <FiPlus className="h-5 w-5" />
              </button>
            </div>
            {errors.requiredSkills && (
              <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{errors.requiredSkills}</p>
            )}
          </div>

          {/* Salary range + Estimated time */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                Approx. Salary Range
              </label>
              <div className="relative">
                <FiDollarSign className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-500 dark:text-indigo-400" />
                <input
                  type="text"
                  value={form.salaryRange}
                  onChange={(e) => handleChange("salaryRange", e.target.value)}
                  placeholder="$70k - $100k"
                  className={inputClasses(errors.salaryRange)}
                />
              </div>
              {errors.salaryRange && (
                <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{errors.salaryRange}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
                Estimated Time to Learn
              </label>
              <div className="relative">
                <FiClock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-500 dark:text-indigo-400" />
                <input
                  type="text"
                  value={form.estimatedTime}
                  onChange={(e) => handleChange("estimatedTime", e.target.value)}
                  placeholder="6-8 months"
                  className={inputClasses(errors.estimatedTime)}
                />
              </div>
              {errors.estimatedTime && (
                <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{errors.estimatedTime}</p>
              )}
            </div>
          </div>

          {/* Optional image */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Cover Image URL <span className="font-normal text-slate-500 dark:text-slate-400">(optional)</span>
            </label>
            <div className="relative">
              <FiImage className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-500 dark:text-indigo-400" />
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => handleChange("imageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={inputClasses(undefined)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="mt-2 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-indigo-600 text-base font-semibold text-white shadow-xs transition-all hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 disabled:pointer-events-none dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {mutation.isPending ? "Posting Guide..." : "Post Career Guide"}
          </button>
        </form>
      </div>
    </div>
  );
}