import { ProductsList } from "../../../components/ProductsList";
import { useContext } from "react";
import { TrackerContext } from "../../../context/TrackerContext";

import Arrow from "../../../assets/arrow-right-solid.svg?react";

import "./TrackerList.scss";

export const TrackerList = () => {
  const { isVisible, setIsVisible, onClickProductPreview } =
    useContext(TrackerContext);
  return (
    <div className="tracker-list">
      <div
        className={
          isVisible
            ? "tracker-list__modal-container tracker-list__modal-container--active"
            : "tracker-list__modal-container"
        }
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => {}, 400);
        }}
      ></div>
      <div
        className={
          isVisible
            ? "tracker-list__modal tracker-list__modal--active"
            : "tracker-list__modal"
        }
      >
        <Arrow
          className="tracker-list__modal-exit"
          onClick={() => setIsVisible(false)}
        />
        <h4 className="tracker-list__modal-title">Dodaj produkt</h4>
        <div className="tracker-list__products-list">
          <ProductsList onClickHandle={onClickProductPreview} />
        </div>
      </div>
    </div>
  );
};
