export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
  },
  DASHBOARD: "/dashboard",
  BOARD: "/projects/:projectId/board",
} as const;
