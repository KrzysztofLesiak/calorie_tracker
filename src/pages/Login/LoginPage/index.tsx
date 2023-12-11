import { Link, Navigate, useLocation } from "react-router-dom";
import { Login } from "../Login";
import "./LoginPage.scss";
import { useContext } from "react";
import { Register } from "../Register";
import { UserContext } from "../../../context/UserContext";

import Honeycomb from "../../../assets/honeycomb.svg?react";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <div className="login-page">
      <div className="login-page__container">
        {user ? (
          <Navigate to="/profile" />
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
                {t("logging")}
              </Link>
              <Link
                to="/register"
                className={
                  pathname === "/register"
                    ? "login-page__link active"
                    : "login-page__link"
                }
              >
                {t("registration")}
              </Link>
            </div>
            <>{pathname === "/login" ? <Login /> : <Register />}</>
          </>
        )}
        <Honeycomb className="login-page__honeycomb" />
        <Honeycomb className="login-page__honeycomb" />
      </div>
    </div>
  );
};
