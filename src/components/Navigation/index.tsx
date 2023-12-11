import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import Logo from "../../assets/logo-calorie2.svg?react";
import ProfileIcon from "../../assets/profile-icon.svg?react";
import NavBars from "../../assets/menu-bars.svg?react";
import Cross from "../../assets/plus-solid.svg?react";
import "./Navigation.scss";
import { onChangeLang } from "../../i18n";
import { useTranslation } from "react-i18next";

export const Navigation = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const handleNavigation = () => {
    navigate("/");
    setIsActive(false);
  };

  const toggleMenu = () => {
    setIsActive((prev) => !prev);
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  return (
    <nav
      className={
        location.pathname === "/" ? "navigation--home navigation" : "navigation"
      }
    >
      <div className="navigation__logo" onClick={handleNavigation}>
        <Logo className="navigation__svg" />
        <span className="navigation__name">CalorieTracker</span>
      </div>
      <div
        className={
          isActive
            ? "navigation__menu--active navigation__menu"
            : "navigation__menu"
        }
      >
        <ul className="navigation__list" onClick={closeMenu}>
          <li className="navigation__item">
            <NavLink className="navigation__link" to="/app">
              {t("navApp")}
            </NavLink>
          </li>
          <li className="navigation__item" onClick={closeMenu}>
            <NavLink className="navigation__link" to="/products">
              {t("navProductBase")}
            </NavLink>
          </li>
        </ul>
        <div className="navigation__container">
          <div className="navigation__lang-box">
            <label
              className={`navigation__lang ${
                i18n.language === "en" ? "navigation__lang--active" : ""
              }`}
            >
              <img
                className={`navigation__flag ${
                  i18n.language === "en" ? "navigation__flag--active" : ""
                }`}
                src="./assets/img/Flag_of_the_United_States.png"
                alt="Flag of the United States"
              />
              <input
                className="navigation__input"
                type="radio"
                name="lang"
                value="en"
                checked={i18n.language === "en"}
                onChange={onChangeLang}
              />
            </label>
            <label
              className={`navigation__lang ${
                i18n.language === "pl" ? "navigation__lang--active" : ""
              }`}
            >
              <img
                className={`navigation__flag ${
                  i18n.language === "pl" ? "navigation__flag--active" : ""
                }`}
                src="./assets/img/Flag_of_Poland.png"
                alt="Flag of Poland"
              />
              <input
                className="navigation__input"
                type="radio"
                name="lang"
                value="pl"
                checked={i18n.language === "pl"}
                onChange={onChangeLang}
              />
            </label>
            {/* <select defaultValue={i18n.language} onChange={onChangeLang}>
            {LANGUAGES.map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select> */}
          </div>
          <Link to="/login" onClick={closeMenu} aria-label="login">
            <ProfileIcon className="navigation__profile" />
          </Link>
        </div>
      </div>
      <div>
        {isActive ? (
          <Cross
            className="navigation__bars--rotate navigation__bars"
            onClick={toggleMenu}
          />
        ) : (
          <NavBars className="navigation__bars" onClick={toggleMenu} />
        )}
      </div>
    </nav>
  );
};
