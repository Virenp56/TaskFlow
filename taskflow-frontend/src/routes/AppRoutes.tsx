import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { ForgotPasswordPage } from "../features/auth/pages/ForgotPasswordPage";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { useAuthStore } from "../stores/useAuthStore";
import { ROUTES } from "./paths";

export const AppRoutes: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      {/* Root redirects based on auth status */}
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.AUTH.LOGIN}
            replace
          />
        }
      />

      {/* Auth Screen Routes */}
      <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />
      <Route
        path={ROUTES.AUTH.FORGOT_PASSWORD}
        element={<ForgotPasswordPage />}
      />

      {/* Protected Main Dashboard Screen */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          isAuthenticated ? (
            <DashboardPage />
          ) : (
            <Navigate to={ROUTES.AUTH.LOGIN} replace />
          )
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.AUTH.LOGIN}
            replace
          />
        }
      />
    </Routes>
  );
};
