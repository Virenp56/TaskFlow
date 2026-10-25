// src/features/auth/pages/ForgotPasswordPage.tsx
import React, { useState } from "react";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes/paths";

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Wire up to your reset email endpoint: /api/v1/auth/forgot-password
    console.log("Sending recovery email to:", email);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleResend = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden w-full flex flex-col lg:flex-row bg-white dark:bg-slate-900 transition-colors duration-200">
      {/* ============================================================ */}
      {/* LEFT COLUMN: Hero Brand & Reset Flow Illustration            */}
      {/* ============================================================ */}
      <div className="w-full lg:w-[48%] bg-[#2563EB] p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden select-none">
        {/* Top: Brand Header */}
        <div className="flex items-center gap-2.5 z-10">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-6 bg-white rounded-full"></span>
            <span className="w-1.5 h-4 bg-white/70 rounded-full"></span>
            <span className="w-1.5 h-5 bg-white/90 rounded-full"></span>
          </div>
          <span className="text-white text-xl font-bold tracking-tight">
            TaskFlow
          </span>
        </div>

        {/* Middle: Informational Card */}
        <div className="my-10 lg:my-0 z-10 max-w-lg">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Secure, reliable password recovery.
          </h1>
          <p className="mt-4 text-blue-100 text-sm sm:text-base leading-relaxed">
            Enterprise-grade token verification and zero-downtime session
            protection keep your team's workspace safe.
          </p>

          <div className="mt-8 sm:mt-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white text-sm font-semibold">
                One-time reset links
              </h3>
              <p className="mt-1 text-blue-100 text-xs leading-relaxed">
                For security reasons, password recovery tokens expire in 30
                minutes and are permanently invalidated once used.
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block text-xs text-blue-200/60">
          Enterprise Security & Identity Management
        </div>
      </div>

      {/* ============================================================ */}
      {/* RIGHT COLUMN: Password Reset Form / Success State            */}
      {/* ============================================================ */}
      <div className="w-full lg:w-[52%] flex items-center justify-center p-6 sm:p-12 lg:p-20">
        <div className="w-full max-w-[420px] flex flex-col">
          {!isSubmitted ? (
            <>
              {/* Form Header */}
              <div className="mb-8">
                <Link
                  to={ROUTES.AUTH.LOGIN}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 mb-6 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </Link>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Reset password
                </h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Enter your email address and we'll send you instructions to
                  reset your password.
                </p>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="reset-email"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition disabled:opacity-50"
                >
                  {isLoading ? "Sending link..." : "Send reset link"}
                </button>
              </form>
            </>
          ) : (
            /* Success Feedback Card */
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto mb-5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Check your inbox
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                We've sent a password reset link to{" "}
                <strong className="text-slate-800 dark:text-slate-200">
                  {email}
                </strong>
                .
              </p>

              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm rounded-lg transition"
                >
                  {isLoading ? "Resending..." : "Click to resend link"}
                </button>

                <Link
                  to={ROUTES.AUTH.LOGIN}
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return to sign in
                </Link>
              </div>
            </div>
          )}

          {/* Footer Help Note */}
          <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
            Need help? Contact{" "}
            <a
              href="mailto:support@taskflow.dev"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              support@taskflow.dev
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
