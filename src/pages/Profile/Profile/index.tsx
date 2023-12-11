import { useContext } from "react";

import { UserContext } from "../../../context/UserContext";
import { useUsers } from "../../../hooks/useUsers";

import "./Profile.scss";
import { useTranslation } from "react-i18next";

export const Profile = () => {
  const { user } = useContext(UserContext);
  const { userData, handleProfileChange, handleProfileEdit, handleLogout } =
    useUsers();

  const { t } = useTranslation();

  const calorieNeeds = () => {
    let activity = 1.8;
    if (userData.activity === "low") {
      activity = 1.5;
    } else if (userData.activity === "high") {
      activity = 2.2;
    }

    if (userData.sex === "female") {
      return (
        (10 * userData.weight +
          6.25 * userData.height -
          5 * userData.age -
          161) *
        activity
      );
    } else if (userData.sex === "male") {
      return (
        (10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5) *
        activity
      );
    } else {
      return (
        (10 * userData.weight + 6.25 * userData.height - 5 * userData.age) *
        activity
      );
    }
  };

  return (
    <div className="profile">
      <div className="profile__container">
        <h2 className="profile__title">
          {t("profileTitle")}
          {user?.displayName}!
        </h2>
        <form className="profile__form" onSubmit={handleProfileEdit}>
          <span>{t("sex")}:</span>
          <div className="profile__radio-box">
            <label>
              <input
                className="profile__radio"
                type="radio"
                name="sex"
                id="male"
                value="male"
                checked={userData.sex === "male"}
                onChange={handleProfileChange}
              />
              <span>{t("male")}</span>
            </label>
            <label>
              <input
                className="profile__radio"
                type="radio"
                name="sex"
                id="female"
                value="female"
                checked={userData.sex === "female"}
                onChange={handleProfileChange}
              />
              <span>{t("female")}</span>
            </label>
            <label>
              <input
                className="profile__radio"
                type="radio"
                name="sex"
                id="other"
                value="other"
                checked={userData.sex === "other"}
                onChange={handleProfileChange}
              />
              <span>{t("other")}</span>
            </label>
          </div>
          <span>{t("activity")}:</span>
          <div className="profile__radio-box">
            <label>
              <input
                className="profile__radio"
                type="radio"
                name="activity"
                id="low"
                value="low"
                checked={userData.activity === "low"}
                onChange={handleProfileChange}
              />
              <span>{t("low")}</span>
            </label>
            <label>
              <input
                className="profile__radio"
                type="radio"
                name="activity"
                id="medium"
                value="medium"
                checked={userData.activity === "medium"}
                onChange={handleProfileChange}
              />
              <span>{t("medium")}</span>
            </label>
            <label>
              <input
                className="profile__radio"
                type="radio"
                name="activity"
                id="high"
                value="high"
                checked={userData.activity === "high"}
                onChange={handleProfileChange}
              />
              <span>{t("high")}</span>
            </label>
          </div>
          <label>{t("age")}:</label>
          <input
            className="profile__input"
            type="number"
            name="age"
            id="age"
            value={userData.age}
            onChange={handleProfileChange}
          />
          <label>{t("height")} [cm]:</label>
          <input
            className="profile__input"
            type="number"
            name="height"
            id="height"
            value={userData.height}
            onChange={handleProfileChange}
          />
          <label>{t("weight")} [kg]:</label>
          <input
            className="profile__input"
            type="number"
            step="0.01"
            name="weight"
            id="weight"
            value={userData.weight}
            onChange={handleProfileChange}
          />
          <button className="profile__save" type="submit">
            {t("save")}
          </button>
        </form>
        <p className="profile__needs">
          {t("needs")}: {calorieNeeds().toFixed(2)}
        </p>
        <button className="profile__logout" onClick={handleLogout}>
          {t("logout")}
        </button>
      </div>
    </div>
  );
};
