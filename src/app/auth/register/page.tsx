"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | null>(null);

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!agreeTerms) newErrors.terms = "You must agree to the Terms & Conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: fullName.trim(),
        email: email.trim(),
        password: password,
        callbackURL: "/auth/login",
      });

      if (error) {
        setServerError(error.message || "Registration failed. Please try again.");
        return;
      }

      router.push("/auth/login");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider: "google") => {
    setServerError("");
    setSocialLoading(provider);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Social signup failed. Please try again.";
      setServerError(message);
      setSocialLoading(null);
    }
  };

  const isDisabled = loading || socialLoading !== null;

  return (
    <div className="mesh-gradient flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
      <div className="card w-full max-w-[440px] p-7 shadow-lg sm:p-9">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white">
            R
          </span>
          <span className="text-lg font-bold text-slate-900">
            RoadmapIQ
          </span>
        </Link>

        <div className="mb-6 text-center">
          <h1 className="heading-page text-xl sm:text-2xl">Create an Account</h1>
          <p className="mt-1.5 text-sm text-slate-500">Join thousands of learners today.</p>
        </div>

        {serverError && (
          <div className="alert alert-error mb-5 flex items-center gap-2" role="alert">
            <FiAlertCircle className="h-4 w-4 shrink-0 text-red-500" />
            <span className="text-sm">{serverError}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => handleSocialSignup("google")}
          disabled={isDisabled}
          className="btn btn-secondary btn-md flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 hover:bg-slate-50 disabled:opacity-50"
        >
          {socialLoading === "google" ? (
            <>
              <svg className="h-5 w-5 animate-spin text-slate-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <FcGoogle className="h-5 w-5 shrink-0" />
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div>
            <label className="form-label mb-1 block text-sm font-medium text-slate-700">Full Name</label>
            <div className="relative">
              <FiUser className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  clearFieldError("fullName");
                }}
                placeholder="John Doe"
                disabled={isDisabled}
                aria-invalid={!!errors.fullName}
                className={`form-input-icon w-full pl-10 pr-4 py-2 rounded-lg border text-sm transition focus:outline-none ${
                  errors.fullName ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                }`}
              />
            </div>
            {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
          </div>

          <div>
            <label className="form-label mb-1 block text-sm font-medium text-slate-700">Email</label>
            <div className="relative">
              <FiMail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFieldError("email");
                }}
                placeholder="example@gmail.com"
                disabled={isDisabled}
                aria-invalid={!!errors.email}
                className={`form-input-icon w-full pl-10 pr-4 py-2 rounded-lg border text-sm transition focus:outline-none ${
                  errors.email ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="form-label mb-1 block text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <FiLock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearFieldError("password");
                }}
                placeholder="••••••••"
                disabled={isDisabled}
                aria-invalid={!!errors.password}
                className={`form-input-icon w-full pl-10 pr-10 py-2 rounded-lg border text-sm transition focus:outline-none ${
                  errors.password ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                disabled={isDisabled}
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          <div>
            <label className="flex items-start gap-2.5 text-sm font-medium text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked);
                  clearFieldError("terms");
                }}
                disabled={isDisabled}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="font-semibold text-indigo-600 hover:text-indigo-700">
                  Terms & Conditions
                </Link>
              </span>
            </label>
            {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms}</p>}
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="btn btn-primary btn-lg mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {loading ? (
              <>
                <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Creating account...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}