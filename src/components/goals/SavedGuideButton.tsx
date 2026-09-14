"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FiBookmark } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

interface SaveGuideButtonProps {
  goalId: string;
}

async function saveGuide(goalId: string) {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/saved-goals/save/${goalId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to save guide");
  }
  return data;
}

export default function SaveGuideButton({ goalId }: SaveGuideButtonProps) {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [isSaved, setIsSaved] = useState(false);

  const mutation = useMutation({
    mutationFn: () => saveGuide(goalId),
    onSuccess: () => {
      setIsSaved(true);
      toast.success("Saved! You can use this in your AI Roadmap.");
    },
    onError: (err: Error) => {
      if (err.message.toLowerCase().includes("already saved")) {
        toast("Already saved to your list.");
        setIsSaved(true);
      } else {
        toast.error(err.message);
      }
    },
  });

  const handleClick = () => {
    if (sessionLoading) return;

    if (!session) {
      toast.error("Login to bookmark this guide");
      return;
    }

    if (isSaved || mutation.isPending) return;
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      disabled={mutation.isPending}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold shadow-xs transition-all ${
        isSaved
          ? "border border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-900/60 dark:bg-blue-950/80 dark:text-blue-400"
          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-slate-800"
      }`}
    >
      <FiBookmark className={`h-4 w-4 ${isSaved ? "fill-blue-600 dark:fill-blue-400 text-blue-600 dark:text-blue-400" : ""}`} />
      {mutation.isPending ? "Saving..." : isSaved ? "Saved" : "Save Guide"}
    </button>
  );
}