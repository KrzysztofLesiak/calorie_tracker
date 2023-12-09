import Logo from "../../../assets/logo-calorie2.svg?react";
import ArrowBracket from "../../../assets/arrow-right-to-bracket-solid.svg?react";
import { useEffect } from "react";

import "./Login.scss";
import { useUsers } from "../../../hooks/useUsers";

export const Login = () => {
  const { inputValue, errorMsg, handleInput, handleLogin, setErrorMsg } =
    useUsers();

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
    <div className="login">
      <Logo className="login__logo" />
      {errorMsg.others && (
        <p className="login__error login__error--others">{errorMsg.others}</p>
      )}

      <form className="login__form" onSubmit={handleLogin}>
        {errorMsg.email && <p className="login__error">{errorMsg.email}</p>}
        <input
          className={
            errorMsg.email ? "login__input login__input--error" : "login__input"
          }
          type="email"
          name="email"
          placeholder="Email"
          value={inputValue.email}
          onChange={handleInput}
          required
        />
        {errorMsg.password.length > 0 && (
          <div className="login__error">
            {errorMsg.password.map((msg) => msg)}
          </div>
        )}
        <input
          className={
            errorMsg.password.length
              ? "login__input login__input--error"
              : "login__input"
          }
          type="password"
          name="password"
          placeholder="Hasło"
          value={inputValue.password}
          onChange={handleInput}
          required
        />
        <button className="login__button" type="submit">
          Zaloguj się <ArrowBracket className="login__arrow" />
        </button>
      </form>
    </div>
  );
};
