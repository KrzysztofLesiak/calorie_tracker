import { useContext } from "react";
import { TrackerContext } from "../../../context/TrackerContext";
import { MealListType } from "../Tracker";

import "./Summary.scss";
import { useTranslation } from "react-i18next";

export const Summary = () => {
  const { mealList, MEAL_TYPES } = useContext(TrackerContext);
  const { t } = useTranslation();

  return (
    <div className="summary">
      <h3 className="summary__title">{t("summary")}</h3>
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
          {t("proteins").slice(0, 1)}:{" "}
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
          {t("carbohydrates").slice(0, 1)}:{" "}
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
          {t("fats").slice(0, 1)}:{" "}
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
