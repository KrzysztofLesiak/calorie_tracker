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
        <h1 className="home__title">
          Healthy lifestyle starts with calorie counting
        </h1>
        <img
          className="home__img"
          src="./src/assets/bowl.png"
          alt="Bowl with healthy food"
        />
        <h2 className="home__text">Get in shape - track calories with us</h2>
        <button className="home__button" onClick={handleClick}>
          Go to App
        </button>
      </section>
      <section className="home__ftr">
        <Link to={"https://linkedin.com"}>
          <Linkedin className="home__icon" />
        </Link>
        <Link to={"https://instagram.com"}>
          <Instagram className="home__icon" />
        </Link>
        <Link to={"https://facebook.com"}>
          <Facebook className="home__icon" />
        </Link>
      </section>
    </div>
  );
};
