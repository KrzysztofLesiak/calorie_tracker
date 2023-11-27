import { ProductType } from "../../context/ProductContext";
import { Product } from "../Product";
import { useParams } from "react-router-dom";
import { DatePicker } from "../DatePicker";

import "./Tracker.scss";
import { MealList } from "../MealList";
import { TrackerListModal } from "../TrackerListModal";
import { Summary } from "../Summary";

export type MealListType = {
  breakfast: ProductType[];
  secondBreakfast: ProductType[];
  dinner: ProductType[];
  lunch: ProductType[];
  supper: ProductType[];
};

export const Tracker = () => {
  const { productId } = useParams();

  return (
    <div className="tracker">
      <DatePicker />
      <MealList />
      <Summary />
      <>
        <TrackerListModal />
        {productId && (
          <div className="tracker__product">
            <Product functionality="add" />
          </div>
        )}
      </>
    </div>
  );
};
