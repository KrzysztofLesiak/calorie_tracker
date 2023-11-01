import Logo from "../../assets/logo-calorie2.svg?react";
import ArrowBracket from "../../assets/arrow-right-to-bracket-solid.svg?react";
import Google from "../../assets/google.svg?react";
import Facebook from "../../assets/facebook.svg?react";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

import "./Login.scss";

export const Login = () => {
  const { inputValue, errorMsg, handleInput, handleLogin, setErrorMsg } =
    useContext(UserContext);

  useEffect(() => {
    setErrorMsg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login">
      <Logo className="login__logo" />
      {errorMsg && <p className="login__error">{errorMsg}</p>}
      <form className="login__form" onSubmit={handleLogin}>
        <input
          className="login__input"
          type="email"
          name="email"
          placeholder="Email"
          value={inputValue.email}
          onChange={handleInput}
          required
        />
        <input
          className="login__input"
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
      <div className="login__others">
        <div className="login__container">
          <Link to="/" className="login__link--outline">
            Zaloguj przy pomocy Google
          </Link>
          <Google className="login__icon" />
        </div>
        <div className="login__container">
          <Link to="/" className="login__link">
            Zaloguj przy pomocy Facebooka
          </Link>
          <Facebook className="login__icon" />
        </div>
      </div>
    </div>
  );
};
