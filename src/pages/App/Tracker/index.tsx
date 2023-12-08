import { useParams } from "react-router-dom";
import { useContext, MouseEvent } from "react";

import { ProductType } from "../../../context/ProductContext";
import { Product } from "../../../components/Product";
import { DatePicker } from "../DatePicker";
import { MealList } from "../MealList";
import { TrackerList } from "../TrackerList";
import { Summary } from "../Summary";
import { TrackerContext } from "../../../context/TrackerContext";

import "./Tracker.scss";

export type MealListType = {
  breakfast: ProductType[];
  secondBreakfast: ProductType[];
  dinner: ProductType[];
  lunch: ProductType[];
  supper: ProductType[];
};

export const Tracker = () => {
  const { productId } = useParams();
  const { isOpen, setIsOpen } = useContext(TrackerContext);

  const closeDatePicker = (event: MouseEvent<HTMLElement>) => {
    const target = event.target;

    if (target instanceof HTMLElement) {
      if (target?.className.includes("react-datepicker")) return;
    }

    if (isOpen) setIsOpen(false);
  };

  return (
    <div className="tracker" onClick={closeDatePicker}>
      <DatePicker />
      <MealList />
      <Summary />
      <TrackerList />
      {productId && (
        <div className="tracker__product">
          <Product functionality="add" />
        </div>
      )}
    </div>
  );
};
