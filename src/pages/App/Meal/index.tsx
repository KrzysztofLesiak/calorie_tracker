import { useContext } from "react";
import { ProductType } from "../../../context/ProductContext";
import { TrackerContext } from "../../../context/TrackerContext";

import Trash from "../../../assets/trash-solid.svg?react";

import "./Meal.scss";
import { useTranslation } from "react-i18next";

type MealProps = {
  meal: ProductType;
  mealType: string;
};

export const Meal = ({ meal, mealType }: MealProps) => {
  const { handleDelete } = useContext(TrackerContext);
  const { t } = useTranslation();

  return (
    <li className="meal__item">
      <div className="meal__product">
        <span className="meal__product-name">{meal.productName}</span>
        <Trash
          className="meal__delete"
          onClick={() => handleDelete(mealType, meal.id!)}
        />
      </div>
      <span className="meal__amount">{(meal.amount! * 100).toFixed(2)}g</span>
      <div className="meal__summary">
        <span>{(meal.energyValue * meal.amount!).toFixed(2)} kcal</span>
        <span>
          {t("proteins").slice(0, 1)}:{" "}
          {(meal.proteins * meal.amount!).toFixed(2)}
        </span>
        <span>
          {t("carbohydrates").slice(0, 1)}:{" "}
          {(meal.carbohydrates * meal.amount!).toFixed(2)}{" "}
        </span>
        <span>
          {t("fats").slice(0, 1)}: {(meal.fats * meal.amount!).toFixed(2)}
        </span>
      </div>
    </li>
  );
};
