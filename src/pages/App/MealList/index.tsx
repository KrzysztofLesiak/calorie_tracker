import { useContext, useState } from "react";
import { TrackerContext } from "../../../context/TrackerContext";
import { MealListType } from "../Tracker";

import "./MealList.scss";
import { Meal } from "../Meal";
import { MealHeader } from "../MealHeader";
import { MealSummary } from "../MealSummary";
import { useTranslation } from "react-i18next";

export const MealList = () => {
  const { mealList, MEAL_TYPES } = useContext(TrackerContext);
  const [isExpanded, setIsExpanded] = useState({
    breakfast: false,
    secondBreakfast: false,
    dinner: false,
    lunch: false,
    supper: false
  });

  const { t } = useTranslation();

  const expand = (mealType: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [mealType]: !prev[mealType as keyof MealListType]
    }));
  };

  return (
    <div className="meal-list__meal-container">
      {MEAL_TYPES.map((mealType) => {
        return (
          <div className="meal-list__box" key={mealType}>
            <MealHeader
              mealType={mealType}
              isExpanded={isExpanded}
              expand={expand}
            />
            <MealSummary mealType={mealType} />
            {mealList[mealType as keyof MealListType].length > 0 ? (
              <ul
                className={
                  isExpanded[mealType as keyof MealListType]
                    ? "meal-list__list meal-list__list--active"
                    : "meal-list__list"
                }
              >
                {mealList[mealType as keyof MealListType].map((meal) => {
                  return <Meal meal={meal} mealType={mealType} key={meal.id} />;
                })}
              </ul>
            ) : (
              <p
                className={
                  isExpanded[mealType as keyof MealListType]
                    ? "meal-list__list meal-list__list--active"
                    : "meal-list__list"
                }
              >
                {t("emptyList")}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
