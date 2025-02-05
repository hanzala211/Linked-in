import { Loader } from "@components";
import { useAuth } from "@context";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedLayout: React.FC = () => {
  const { isMainPageLoading } = useAuth()
  const token = localStorage.getItem("token")
  return isMainPageLoading ? <Loader /> : token ? <Outlet /> : <Navigate to="/login" replace />;
};