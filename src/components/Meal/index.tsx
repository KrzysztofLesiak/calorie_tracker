import { ProductType } from "../../context/ProductContext";
import { useContext } from "react";
import { TrackerContext } from "../../context/TrackerContext";

import Trash from "../../assets/trash-solid.svg?react";

import "./Meal.scss";

type MealProps = {
  meal: ProductType;
  mealType: string;
};

export const Meal = ({ meal, mealType }: MealProps) => {
  const { handleDelete } = useContext(TrackerContext);
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
        <span>B: {(meal.proteins * meal.amount!).toFixed(2)}</span>
        <span>W: {(meal.carbohydrates * meal.amount!).toFixed(2)} </span>
        <span>T: {(meal.fats * meal.amount!).toFixed(2)}</span>
      </div>
    </li>
  );
};
