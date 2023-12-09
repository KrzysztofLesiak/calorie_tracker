import { useEffect } from "react";

import Logo from "../../../assets/logo-calorie2.svg?react";
import ArrowBracket from "../../../assets/arrow-right-to-bracket-solid.svg?react";

import "./Register.scss";
import { useUsers } from "../../../hooks/useUsers";

export const Register = () => {
  const {
    registerInputValue,
    errorMsg,
    matchValidation,
    setErrorMsg,
    handleRegisterInput,
    handleRegister
  } = useUsers();

  useEffect(() => {
    setErrorMsg({
      email: "",
      username: "",
      password: [],
      confirmPassword: "",
      others: ""
    });
  }, [setErrorMsg]);

  return (
    <div className="register">
      <Logo className="register__logo" />
      <form onSubmit={handleRegister}>
        {errorMsg.email && <p className="login__error">{errorMsg.email}</p>}
        <input
          className={`register__input${
            matchValidation.email ? " register__input--validation" : ""
          }${errorMsg.email ? " register__input register__input--error" : ""}`}
          type="email"
          name="email"
          placeholder="Email"
          value={registerInputValue.email}
          onChange={handleRegisterInput}
        />
        {errorMsg.username && (
          <p className="login__error">{errorMsg.username}</p>
        )}
        <input
          className={`register__input ${
            matchValidation.username ? "register__input--validation" : ""
          } ${errorMsg.username ? "register__input--error" : ""}`}
          type="username"
          name="username"
          placeholder="Nazwa użytkownika"
          value={registerInputValue.username}
          onChange={handleRegisterInput}
        />
        {errorMsg.password.length > 0 && (
          <div className="login__error">
            {errorMsg.password.map((msg) => (
              <p key={msg}>{msg}</p>
            ))}
          </div>
        )}
        <input
          className={`register__input ${
            matchValidation.password ? "register__input--validation" : ""
          } ${errorMsg.password.length ? "register__input--error" : ""}`}
          type="password"
          name="password"
          placeholder="Hasło"
          value={registerInputValue.password}
          onChange={handleRegisterInput}
        />
        <ul className="register__password">
          <li>Hasło musi zawierać cyfry</li>
          <li>Hasło musi zawierać wielkie litery</li>
          <li>Hasło musi zawierać małe litery</li>
          <li>Hasło musi zawierać znak specjalny @$!%*?&</li>
          <li>Długość hasła musi być większa niż 6 znaków</li>
        </ul>
        {errorMsg.confirmPassword && (
          <p className="login__error">{errorMsg.confirmPassword}</p>
        )}
        <input
          className={`register__input ${
            matchValidation.confirmPassword ? "register__input--validation" : ""
          } ${errorMsg.confirmPassword ? "register__input--error" : ""}`}
          type="password"
          name="confirmPassword"
          placeholder="Potwierdź hasło"
          value={registerInputValue.confirmPassword}
          onChange={handleRegisterInput}
        />
        <button className="login__button" type="submit">
          Zarejestruj się <ArrowBracket className="login__arrow" />
        </button>
      </form>
    </div>
  );
};
