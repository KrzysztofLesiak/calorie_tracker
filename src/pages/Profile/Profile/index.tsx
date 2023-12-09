import { useContext } from "react";

import { UserContext } from "../../../context/UserContext";

import "./Profile.scss";
import { useUsers } from "../../../hooks/useUsers";

export const Profile = () => {
  const { user } = useContext(UserContext);
  const { userData, handleProfileChange, handleProfileEdit, handleLogout } =
    useUsers();

  return (
    <div className="profile">
      <h2>Twój Profil</h2>
      <p>{user?.displayName}</p>
      <form onSubmit={handleProfileEdit}>
        <label>
          Płeć:
          <input
            type="radio"
            name="sex"
            id="male"
            value="male"
            checked={userData.sex === "male"}
            onChange={handleProfileChange}
          />
          <input
            type="radio"
            name="sex"
            id="female"
            value="female"
            checked={userData.sex === "female"}
            onChange={handleProfileChange}
          />
          <input
            type="radio"
            name="sex"
            id="other"
            value="other"
            checked={userData.sex === "other"}
            onChange={handleProfileChange}
          />
        </label>
        <label>
          Wzrost:
          <input
            type="number"
            name="height"
            id="height"
            value={userData.height}
            onChange={handleProfileChange}
          />
        </label>
        <label>
          Waga:
          <input
            type="number"
            step="0.01"
            name="weight"
            id="weight"
            value={userData.weight}
            onChange={handleProfileChange}
          />
        </label>
        <button type="submit">Zapisz</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
