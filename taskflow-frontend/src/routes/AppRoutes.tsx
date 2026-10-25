import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { ForgotPasswordPage } from "../features/auth/pages/ForgotPasswordPage";
import { ROUTES } from "./paths";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Root redirects to Login */}
      <Route path="/" element={<Navigate to={ROUTES.AUTH.LOGIN} replace />} />

      {/* Auth Screen Routes */}
      <Route path={ROUTES.AUTH.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.AUTH.REGISTER} element={<RegisterPage />} />
      <Route
        path={ROUTES.AUTH.FORGOT_PASSWORD}
        element={<ForgotPasswordPage />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={ROUTES.AUTH.LOGIN} replace />} />
    </Routes>
  );
};
