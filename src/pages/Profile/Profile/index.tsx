import { useContext } from "react";

import { UserContext } from "../../../context/UserContext";
import { useUsers } from "../../../hooks/useUsers";

import "./Profile.scss";

export const Profile = () => {
  const { user } = useContext(UserContext);
  const { userData, handleProfileChange, handleProfileEdit, handleLogout } =
    useUsers();

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
        <h2 className="profile__title">Witaj, {user?.displayName}!</h2>
        <form className="profile__form" onSubmit={handleProfileEdit}>
          <span>Płeć:</span>
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
              <span>Mężczyzna</span>
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
              <span>Kobieta</span>
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
              <span>Inna</span>
            </label>
          </div>
          <span>Aktywność fizyczna:</span>
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
              <span>Niska</span>
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
              <span>Średnia</span>
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
              <span>Wysoka</span>
            </label>
          </div>
          <label>Wiek:</label>
          <input
            className="profile__input"
            type="number"
            name="age"
            id="age"
            value={userData.age}
            onChange={handleProfileChange}
          />
          <label>Wzrost [cm]:</label>
          <input
            className="profile__input"
            type="number"
            name="height"
            id="height"
            value={userData.height}
            onChange={handleProfileChange}
          />
          <label>Waga [kg]:</label>
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
            Zapisz
          </button>
        </form>
        <p className="profile__needs">
          Twoje zapotrzebowanie kaloryczne wynosi {calorieNeeds().toFixed(2)}
        </p>
        <button className="profile__logout" onClick={handleLogout}>
          Wyloguj
        </button>
      </div>
    </div>
  );
};
