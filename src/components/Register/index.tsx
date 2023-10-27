import Logo from "../../assets/logo-calorie2.svg?react";
import ArrowBracket from "../../assets/arrow-right-to-bracket-solid.svg?react";

import "./Register.scss";

export const Register = () => {
  return (
    <div className="register">
      <Logo className="register__logo" />
      <form>
        <input
          className="register__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="register__input"
          type="username"
          name="username"
          placeholder="Nazwa użytkownika"
          required
        />
        <input
          className="register__input"
          type="password"
          name="password"
          placeholder="Hasło"
          required
        />
        <input
          className="register__input"
          type="password"
          name="confirm_password"
          placeholder="Potwierdź hasło"
          required
        />
        <button className="login__button" type="submit">
          Zarejestruj się <ArrowBracket className="login__arrow" />
        </button>
      </form>
    </div>
  );
};
