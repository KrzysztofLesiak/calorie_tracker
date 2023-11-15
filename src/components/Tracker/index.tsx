import { ProductsList } from "../ProductsList";
import Plus from "../../assets/plus-solid.svg?react";
import { LegacyRef, useContext, useEffect, useRef, useState } from "react";
import { ProductType } from "../../context/ProductContext";
import Chevron from "../../assets/chevron-up-solid.svg?react";
import Arrow from "../../assets/arrow-right-solid.svg?react";

import "./Tracker.scss";
import { Product } from "../Product";
import { TrackerContext } from "../../context/TrackerContext";
import { useParams } from "react-router-dom";

export type MealListType = {
  breakfast: ProductType[];
  secondBreakfast: ProductType[];
  dinner: ProductType[];
  lunch: ProductType[];
  supper: ProductType[];
};

export const Tracker = () => {
  const { productId } = useParams();

  const {
    mealList,
    isVisible,
    MEAL_TYPES,
    currentDate,
    DAYS_OF_THE_WEEK,
    week,
    date,
    handleDateSelect,
    showProductsList,
    handleDelete,
    setIsVisible,
    onClickProductPreview,
    formatDate,
    handleDateInput,
    changeWeek,
  } = useContext(TrackerContext);
  const [isExpanded, setIsExpanded] = useState({
    breakfast: false,
    secondBreakfast: false,
    dinner: false,
    lunch: false,
    supper: false,
  });

  const elementRef = useRef<LegacyRef<HTMLUListElement> | undefined>(null);

  const expand = (mealType: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [mealType]: !prev[mealType as keyof MealListType],
    }));
  };

  useEffect(() => {
    if (elementRef.current) console.log(elementRef.current.offsetHeight);
  }, []);

  return (
    <div className="tracker">
      <div className="tracker__date-picker">
        <div className="tracker__input-container">
          <Chevron
            className="tracker__arrow tracker__arrow--previous"
            onClick={() => changeWeek(1)}
          />
          <div className="">
            <input
              className="tracker__date-input"
              type="date"
              value={currentDate}
              onChange={handleDateInput}
              pattern="\d{4}-\d{2}-\d{2}"
            />
            <span className="tracker__date">{date}</span>
          </div>
          <Chevron
            className="tracker__arrow tracker__arrow--next"
            onClick={() => changeWeek(-1)}
          />
        </div>
        {week && (
          <ul className="tracker__days-list">
            {week.map((day) => {
              return (
                <li
                  key={day.getDate()}
                  className={
                    formatDate(day) === currentDate
                      ? "tracker__days-item tracker__days-item--active"
                      : "tracker__days-item"
                  }
                  onClick={() => handleDateSelect(day)}
                >
                  <p>{DAYS_OF_THE_WEEK[day.getDay()]}</p>
                  <p>{day.getDate()}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="tracker__meal-container">
        {MEAL_TYPES.map((mealType) => {
          return (
            <div className="tracker__meal-box" key={mealType}>
              <div className="tracker__header">
                <span className="tracker__meal-type">
                  {mealType === "breakfast" && "Śniadanie"}
                  {mealType === "secondBreakfast" && "Drugie Śniadanie"}
                  {mealType === "dinner" && "Obiad"}
                  {mealType === "lunch" && "Lunch"}
                  {mealType === "supper" && "Kolacja"}
                </span>
                <div className="tracker__button-box">
                  <Plus
                    className="tracker__plus"
                    onClick={() => showProductsList(mealType)}
                  />
                  <Chevron
                    className={
                      isExpanded[mealType as keyof MealListType]
                        ? "tracker__chevron tracker__chevron--active"
                        : "tracker__chevron"
                    }
                    onClick={() => expand(mealType)}
                  />
                </div>
              </div>
              <p className="tracker__summary">
                <span>
                  {mealList[mealType as keyof MealListType]
                    .reduce((acc, { amount, energyValue }) => {
                      return acc + amount! * energyValue;
                    }, 0)
                    .toFixed(2)}{" "}
                  kcal
                </span>
                <span>
                  B:{" "}
                  {mealList[mealType as keyof MealListType]
                    .reduce((acc, { amount, proteins }) => {
                      return acc + amount! * proteins;
                    }, 0)
                    .toFixed(2)}
                </span>
                <span>
                  W:{" "}
                  {mealList[mealType as keyof MealListType]
                    .reduce((acc, { amount, carbohydrates }) => {
                      return acc + amount! * carbohydrates;
                    }, 0)
                    .toFixed(2)}
                </span>
                <span>
                  T:{" "}
                  {mealList[mealType as keyof MealListType]
                    .reduce((acc, { amount, fats }) => {
                      return acc + amount! * fats;
                    }, 0)
                    .toFixed(2)}
                </span>
              </p>
              {mealList[mealType as keyof MealListType].length > 0 ? (
                <ul
                  className={
                    isExpanded[mealType as keyof MealListType]
                      ? "tracker__meal-list tracker__meal-list--active"
                      : "tracker__meal-list"
                  }
                >
                  {mealList[mealType as keyof MealListType].map((meal) => {
                    return (
                      <li className="tracker__meal-item" key={meal.id}>
                        <div className="tracker__product">
                          <span className="tracker__product-name">
                            {meal.productName}
                          </span>

                          <button
                            onClick={() => handleDelete(mealType, meal.id!)}
                          >
                            Usuń
                          </button>
                        </div>
                        <span>Ilość: {(meal.amount! * 100).toFixed(2)} g</span>
                        <div className="tracker__product-info">
                          <span>
                            {(meal.energyValue * meal.amount!).toFixed(2)} kcal
                            B:{" "}
                          </span>
                          <span>
                            {(meal.proteins * meal.amount!).toFixed(2)} W:{" "}
                          </span>
                          <span>
                            {(meal.carbohydrates * meal.amount!).toFixed(2)} T:{" "}
                          </span>
                          <span>{(meal.fats * meal.amount!).toFixed(2)}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p
                  className={
                    isExpanded[mealType as keyof MealListType]
                      ? "tracker__meal-list tracker__meal-list--active"
                      : "tracker__meal-list"
                  }
                >
                  Brak produktów
                </p>
              )}
            </div>
          );
        })}
      </div>
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
            isVisible
              ? "tracker__modal tracker__modal--active"
              : "tracker__modal"
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
        {productId && (
          <div className="tracker__product">
            <Product functionality="add" />
          </div>
        )}
      </>
    </div>
  );
};
