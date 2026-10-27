// src/features/auth/pages/RegisterPage.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Check, MoreHorizontal } from "lucide-react";
import { api } from "../../../lib/axios";
import { useAuthStore } from "../../../stores/useAuthStore";
import { ROUTES } from "../../../routes/paths";

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("Please accept the Terms of Service to continue.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name: fullName,
        email,
        password,
      });

      const { user, accessToken } = response.data.data;
      setAuth(user, accessToken);
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signupWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setIsLoading(true);
        const userInfo = await api.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        const response = await api.post("/auth/google", {
          idToken: tokenResponse.access_token,
          email: userInfo.data.email,
          name: userInfo.data.name,
          avatarUrl: userInfo.data.picture,
        });

        const { user, accessToken } = response.data.data;
        setAuth(user, accessToken);
        navigate("/");
      } catch (err: any) {
        setErrorMessage("Google registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => setErrorMessage("Google Sign-In was cancelled or failed."),
  });

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden w-full flex flex-col lg:flex-row bg-white dark:bg-slate-900 transition-colors duration-200">
      {/* Left Column Preview */}
      <div className="w-full lg:w-[48%] bg-[#2563EB] p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden select-none">
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

        <div className="my-10 lg:my-0 z-10 max-w-lg">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Start delivering faster with your team.
          </h1>
          <p className="mt-4 text-blue-100 text-sm sm:text-base leading-relaxed">
            Create an organization, organize sprints, monitor velocity charts,
            and streamline engineering governance.
          </p>

          <div className="mt-8 sm:mt-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <span className="text-white text-sm font-semibold tracking-wide">
                Workspace onboarding
              </span>
              <MoreHorizontal className="w-4 h-4 text-white/70" />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                  <span className="w-2 h-2 rounded-full border border-white/80"></span>
                  <span>Set up</span>
                  <span className="text-white/60">1</span>
                </div>
                <div className="bg-white rounded-lg p-2.5 shadow-sm text-slate-800">
                  <p className="text-xs font-semibold leading-snug">
                    Invite team members
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] font-medium text-slate-500">
                      Org Admin
                    </span>
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-semibold flex items-center justify-center">
                      AD
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>In progress</span>
                  <span className="text-white/60">1</span>
                </div>
                <div className="bg-white rounded-lg p-2.5 shadow-sm text-slate-800">
                  <p className="text-xs font-semibold leading-snug">
                    Configure sprint flow
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] font-medium text-slate-500">
                      Agile
                    </span>
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-semibold flex items-center justify-center">
                      PM
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                  <Check className="w-3 h-3 text-white stroke-[2.5]" />
                  <span>Done</span>
                  <span className="text-white/60">1</span>
                </div>
                <div className="bg-white rounded-lg p-2.5 shadow-sm text-slate-800">
                  <p className="text-xs font-semibold leading-snug">
                    Connect repository
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] font-medium text-emerald-600">
                      DevOps
                    </span>
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-semibold flex items-center justify-center">
                      DV
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block text-xs text-blue-200/60">
          Enterprise Task & Sprint Management
        </div>
      </div>

      {/* Right Column Registration Form */}
      <div className="w-full lg:w-[52%] flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-[420px] flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Get started with your free 14-day team trial.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg text-rose-600 dark:text-rose-400 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Morgan"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Work email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Password (min. 8 characters)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Confirm password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700"
              />
              <label
                htmlFor="terms"
                className="text-xs text-slate-600 dark:text-slate-400 leading-snug"
              >
                I agree to TaskFlow's Terms of Service and Privacy Policy.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <span className="relative px-3 bg-white dark:bg-slate-900 text-xs text-slate-400 uppercase tracking-wider font-medium">
              or
            </span>
          </div>

          <button
            type="button"
            onClick={() => signupWithGoogle()}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 transition text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign up with Google
          </button>

          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to={ROUTES.AUTH.LOGIN}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
