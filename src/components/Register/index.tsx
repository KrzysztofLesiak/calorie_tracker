import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

import Logo from "../../assets/logo-calorie2.svg?react";
import ArrowBracket from "../../assets/arrow-right-to-bracket-solid.svg?react";

import "./Register.scss";

export const Register = () => {
  const { registerInputValue, handleRegisterInput, handleRegister } =
    useContext(UserContext);

  return (
    <div className="register">
      <Logo className="register__logo" />
      <form onSubmit={handleRegister}>
        <input
          className="register__input"
          type="email"
          name="email"
          placeholder="Email"
          value={registerInputValue.email}
          onChange={handleRegisterInput}
          required
        />
        <input
          className="register__input"
          type="username"
          name="username"
          placeholder="Nazwa użytkownika"
          value={registerInputValue.username}
          onChange={handleRegisterInput}
          required
        />
        <input
          className="register__input"
          type="password"
          name="password"
          placeholder="Hasło"
          value={registerInputValue.password}
          onChange={handleRegisterInput}
          required
        />
        <input
          className="register__input"
          type="password"
          name="confirmPassword"
          placeholder="Potwierdź hasło"
          value={registerInputValue.confirmPassword}
          onChange={handleRegisterInput}
          required
        />
        <button className="login__button" type="submit">
          Zarejestruj się <ArrowBracket className="login__arrow" />
        </button>
      </form>
    </div>
  );
};
