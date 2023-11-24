import { useContext } from "react";
import { TrackerContext } from "../../context/TrackerContext";
import { MealListType } from "../Tracker";

import "./MealSummary.scss";

type MealSummaryProps = {
  mealType: string;
};

export const MealSummary = ({ mealType }: MealSummaryProps) => {
  const { mealList } = useContext(TrackerContext);

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
  );
};
