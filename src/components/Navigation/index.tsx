import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import Logo from "../../assets/logo-calorie2.svg?react";
import ProfileIcon from "../../assets/profile-icon.svg?react";
import NavBars from "../../assets/menu-bars.svg?react";
import Cross from "../../assets/plus-solid.svg?react";
import "./Navigation.scss";

export const Navigation = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
    setIsActive(false);
  };

  const toggleMenu = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <nav className="navigation">
      <div className="navigation__logo" onClick={handleNavigation}>
        <Logo className="navigation__svg" />
        <span className="navigation__name">CalorieTracker</span>
      </div>
      <div
        className={isActive ? "navigation__menu--active" : "navigation__menu"}
      >
        <ul className="navigation__list">
          <li className="navigation__item">
            <NavLink to="/">Application</NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to="/">Product Base</NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to="/">About Us</NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to="/">Contact</NavLink>
          </li>
        </ul>
        <div className="navigation__container">
          <div className="navigation__lang">
            <span>ENG </span>|<span> PL</span>
          </div>
          <Link to="/login">
            <ProfileIcon className="navigation__profile" />
          </Link>
        </div>
      </div>
      {isActive ? (
        <Cross className="navigation__bars--rotate" onClick={toggleMenu} />
      ) : (
        <NavBars className="navigation__bars" onClick={toggleMenu} />
      )}
    </nav>
  );
};
