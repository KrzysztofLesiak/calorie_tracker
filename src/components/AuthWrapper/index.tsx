import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export const AuthWrapper = () => {
  const location = useLocation();
  const { user, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) navigate("/login", { state: { from: location } });
  }, [user, isLoading]);

  return <Outlet />;
};
