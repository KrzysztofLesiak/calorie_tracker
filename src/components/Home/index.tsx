import { Link, useNavigate } from "react-router-dom";
import Honeycomb from "../../assets/honeycomb.svg?react";
import Instagram from "../../assets/instagram.svg?react";
import Facebook from "../../assets/facebook.svg?react";
import Linkedin from "../../assets/linkedin.svg?react";
import "./Home.scss";

export const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/app");
  };

  return (
    <div className="home">
      <section className="home__container">
        <Honeycomb className="home__honeycomb" />
        <Honeycomb className="home__honeycomb" />
        <h1
          className="home__app-name"
          data-content="CalorieTracker"
          data-testid="home-app-name-test-id"
        >
          CalorieTracker
        </h1>
        <h2 className="home__title">
          Zdrowe życie zaczyna się od liczenia kalorii
        </h2>
        <img
          className="home__img"
          src="./assets/img/bowl.png"
          alt="Bowl with healthy food"
        />
        <h3 className="home__text">Zadbaj o formę - śledź z nami kalorie</h3>
        <button className="home__button" onClick={handleClick}>
          Go to App
        </button>
        <div className="home__background"></div>
      </section>
      <section className="home__ftr">
        <Link
          to={"https://linkedin.com"}
          className="home__icon home__icon--linkedin"
        >
          <Linkedin />
        </Link>
        <Link
          to={"https://instagram.com"}
          className="home__icon home__icon--instagram"
        >
          <Instagram />
        </Link>
        <Link
          to={"https://facebook.com"}
          className="home__icon home__icon--facebook"
          data-testid="link"
        >
          <Facebook />
        </Link>
      </section>
    </div>
  );
};
