import { Outlet, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { Loading } from "@/components/shared/loader";
import AuthController from "@/controllers/authController";

export const TokenProtectedRoutes = () => {
  const { token } = AuthController.get();

  return token ? (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
};

export const PublicRoute = () => {
  const { token } = AuthController.get();
  return token ? <Navigate to="/" /> : <Outlet />;
};
