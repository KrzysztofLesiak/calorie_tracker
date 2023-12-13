import { useContext } from "react";
import { TrackerContext } from "../../../context/TrackerContext";
import { MealListType } from "../Tracker";

import "./MealSummary.scss";
import { useTranslation } from "react-i18next";

type MealSummaryProps = {
  mealType: string;
};

export const MealSummary = ({ mealType }: MealSummaryProps) => {
  const { mealList } = useContext(TrackerContext);
  const { t } = useTranslation();

  return (
    <p className="meal-summary">
      <span>
        {mealList[mealType as keyof MealListType]
          .reduce((acc, { amount, energyValue }) => {
            return acc + amount! * energyValue;
          }, 0)
          .toFixed(2)}{" "}
        kcal
      </span>
      <span>
        {t("proteins").slice(0, 1)}:{" "}
        {mealList[mealType as keyof MealListType]
          .reduce((acc, { amount, proteins }) => {
            return acc + amount! * proteins;
          }, 0)
          .toFixed(2)}
      </span>
      <span>
        {t("carbohydrates").slice(0, 1)}:{" "}
        {mealList[mealType as keyof MealListType]
          .reduce((acc, { amount, carbohydrates }) => {
            return acc + amount! * carbohydrates;
          }, 0)
          .toFixed(2)}
      </span>
      <span>
        {t("fats").slice(0, 1)}:{" "}
        {mealList[mealType as keyof MealListType]
          .reduce((acc, { amount, fats }) => {
            return acc + amount! * fats;
          }, 0)
          .toFixed(2)}
      </span>
    </p>
  );
};
