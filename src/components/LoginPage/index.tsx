import { Link, useLocation } from "react-router-dom";
import { Login } from "../Login";
import "./LoginPage.scss";
import { useEffect } from "react";

export const LoginPage = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  return (
    <div className="login-page">
      <div className="login-page__selector">
        <Link
          to="/login"
          className={
            pathname === "/login"
              ? "login-page__link active"
              : "login-page__link"
          }
        >
          Logowanie
        </Link>
        <Link
          to="/register"
          className={
            pathname === "/register"
              ? "login-page__link active"
              : "login-page__link"
          }
        >
          Rejestracja
        </Link>
      </div>
      {pathname === "/login" ? <Login /> : <p>register</p>}
    </div>
  );
};
