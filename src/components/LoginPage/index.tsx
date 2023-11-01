import { Link, Navigate, useLocation } from "react-router-dom";
import { Login } from "../Login";
import "./LoginPage.scss";
import { useContext } from "react";
import { Register } from "../Register";
import { UserContext } from "../../context/UserContext";

export const LoginPage = () => {
  const { token, handleLogout } = useContext(UserContext);
  const { pathname } = useLocation();

  return (
    <div className="login-page">
      {token ? (
        // <Navigate to="/profile" />
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
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
          <>{pathname === "/login" ? <Login /> : <Register />}</>
        </>
      )}
    </div>
  );
};
