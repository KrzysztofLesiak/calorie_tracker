import { useContext } from "react";
import { TrackerContext } from "../../../context/TrackerContext";

import Plus from "../../../assets/plus-solid.svg?react";
import Chevron from "../../../assets/chevron-up-solid.svg?react";
import { MealListType } from "../Tracker";

import "./MealHeader.scss";

type MealHeaderProps = {
  mealType: string;
  isExpanded: {
    breakfast: boolean;
    secondBreakfast: boolean;
    dinner: boolean;
    lunch: boolean;
    supper: boolean;
  };
  expand: (mealType: string) => void;
};

export const MealHeader = ({
  mealType,
  isExpanded,
  expand
}: MealHeaderProps) => {
  const { showProductsList } = useContext(TrackerContext);

  return (
    <div className="meal-header">
      <span className="meal-header__meal-type">
        {mealType === "breakfast" && "Śniadanie"}
        {mealType === "secondBreakfast" && "Drugie Śniadanie"}
        {mealType === "dinner" && "Obiad"}
        {mealType === "lunch" && "Lunch"}
        {mealType === "supper" && "Kolacja"}
      </span>
      <div className="meal-header__button-box">
        <Plus
          className="meal-header__plus"
          onClick={() => showProductsList(mealType)}
        />
        <Chevron
          className={
            isExpanded[mealType as keyof MealListType]
              ? "meal-header__chevron meal-header__chevron--active"
              : "meal-header__chevron"
          }
          onClick={() => expand(mealType)}
        />
      </div>
    </div>
  );
};
