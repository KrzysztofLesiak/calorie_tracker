import { ProductsList } from "../ProductsList";
import { useContext } from "react";
import { TrackerContext } from "../../context/TrackerContext";

import Arrow from "../../assets/arrow-right-solid.svg?react";

export const TrackerListModal = () => {
  const { isVisible, setIsVisible, onClickProductPreview } =
    useContext(TrackerContext);
  return (
    <>
      <div
        className={
          isVisible
            ? "tracker__modal-container tracker__modal-container--active"
            : "tracker__modal-container"
        }
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => {}, 400);
        }}
      ></div>
      <div
        className={
          isVisible ? "tracker__modal tracker__modal--active" : "tracker__modal"
        }
      >
        <Arrow
          className="tracker__modal-exit"
          onClick={() => setIsVisible(false)}
        />
        <h4 className="tracker__modal-title">Dodaj produkt</h4>
        <div className="tracker__products-list">
          <ProductsList onClickHandle={onClickProductPreview} />
        </div>
      </div>
    </>
  );
};
