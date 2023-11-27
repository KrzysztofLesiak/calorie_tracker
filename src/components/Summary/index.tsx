import { useContext } from "react";
import { TrackerContext } from "../../context/TrackerContext";
import { MealListType } from "../Tracker";

import "./Summary.scss";

export const Summary = () => {
  const { mealList, MEAL_TYPES } = useContext(TrackerContext);

  return (
    <div className="summary">
      <h3 className="summary__title">Podsumowanie</h3>
      <div className="summary__grid">
        <span>
          {MEAL_TYPES.map((mealType) =>
            mealList[mealType as keyof MealListType].reduce(
              (acc, { amount, energyValue }) => {
                return acc + amount! * energyValue;
              },
              0
            )
          )
            .reduce((acc, cur) => acc + cur, 0)
            .toFixed(2)}{" "}
          kcal
        </span>
        <span>
          B:{" "}
          {MEAL_TYPES.map((mealType) =>
            mealList[mealType as keyof MealListType].reduce(
              (acc, { amount, proteins }) => {
                return acc + amount! * proteins;
              },
              0
            )
          )
            .reduce((acc, cur) => acc + cur, 0)
            .toFixed(2)}
        </span>
        <span>
          W:{" "}
          {MEAL_TYPES.map((mealType) =>
            mealList[mealType as keyof MealListType].reduce(
              (acc, { amount, carbohydrates }) => {
                return acc + amount! * carbohydrates;
              },
              0
            )
          )
            .reduce((acc, cur) => acc + cur, 0)
            .toFixed(2)}
        </span>
        <span>
          T:{" "}
          {MEAL_TYPES.map((mealType) =>
            mealList[mealType as keyof MealListType].reduce(
              (acc, { amount, fats }) => {
                return acc + amount! * fats;
              },
              0
            )
          )
            .reduce((acc, cur) => acc + cur, 0)
            .toFixed(2)}
        </span>
      </div>
    </div>
  );
};
