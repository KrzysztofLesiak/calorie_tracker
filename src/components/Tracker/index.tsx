import { useDate } from "../../hooks/useDate";
import { ProductsList } from "../ProductsList";
import Plus from "../../assets/plus-solid.svg?react";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addToList,
  deleteMeal,
  getMealList,
} from "../../utils/firebase/firebase";
import { UserContext } from "../../context/UserContext";
import { ProductType } from "../../context/ProductContext";
import Arrow from "../../assets/chevron-up-solid.svg?react";

import "./Tracker.scss";

export type MealListType = {
  breakfast: ProductType[];
  secondBreakfast: ProductType[];
  dinner: ProductType[];
  lunch: ProductType[];
  supper: ProductType[];
};

const MEAL_TYPES = [
  "breakfast",
  "secondBreakfast",
  "dinner",
  "lunch",
  "supper",
];

export const Tracker = () => {
  const { user } = useContext(UserContext);
  const {
    currentDate,
    DAYS_OF_THE_WEEK,
    week,
    date,
    setCurrentDate,
    handleDateInput,
    changeWeek,
    formatDate,
  } = useDate();
  const [isVisible, setIsVisible] = useState(false);
  const [meal, setMeal] = useState("");
  const [mealList, setMealList] = useState({
    breakfast: [],
    secondBreakfast: [],
    dinner: [],
    lunch: [],
    supper: [],
  } as MealListType);
  const [amount, setAmount] = useState(0);

  const handleDateSelect = async (date: Date) => {
    setCurrentDate(formatDate(date));
    setIsVisible(false);
  };

  const getMeal = useCallback(() => {
    if (user) {
      MEAL_TYPES.forEach(async (mealType) => {
        const response = await getMealList(user.uid, currentDate, mealType);
        setMealList((prev) => ({
          ...prev,
          [mealType as keyof MealListType]: response,
        }));
      });
    }
  }, [currentDate, user]);

  const addProductToList = async (id: string) => {
    if (user && amount > 0) {
      await addToList(user.uid, currentDate, meal, id, amount);
      setAmount(0);
    }

    getMeal();
  };

  const showProductsList = (meal: string) => {
    setMeal(meal);
    setIsVisible(true);
  };

  const handleDelete = async (mealType: string, id: string) => {
    if (user) await deleteMeal(user.uid, currentDate, mealType, id);

    getMeal();
  };

  const handleAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  useEffect(() => {
    if (currentDate) {
      getMeal();
    }
  }, [currentDate, getMeal]);

  return (
    <div className="tracker">
      <div className="tracker__date-picker">
        <div className="tracker__input-container">
          <Arrow
            className="tracker__arrow tracker__arrow--previous"
            onClick={() => changeWeek(1)}
          />
          <div className="">
            <input
              className="tracker__date-input"
              type="date"
              value={currentDate}
              onChange={handleDateInput}
              pattern="\d{4}-\d{2}-\d{2}"
            />
            <span className="tracker__date">{date}</span>
          </div>
          <Arrow
            className="tracker__arrow tracker__arrow--next"
            onClick={() => changeWeek(-1)}
          />
        </div>
        {week && (
          <ul className="tracker__days-list">
            {week.map((day) => {
              return (
                <li
                  key={day.getDate()}
                  className={
                    formatDate(day) === currentDate
                      ? "tracker__days-item tracker__days-item--active"
                      : "tracker__days-item"
                  }
                  onClick={() => handleDateSelect(day)}
                >
                  <p>{DAYS_OF_THE_WEEK[day.getDay()]}</p>
                  <p>{day.getDate()}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {MEAL_TYPES.map((mealType) => {
        return (
          <div className="tracker__meal-container">
            <span>{mealType === "breakfast" && "Śniadanie"}</span>
            <span>{mealType === "secondBreakfast" && "Drugie Śniadanie"}</span>
            <span>{mealType === "dinner" && "Obiad"}</span>
            <span>{mealType === "lunch" && "Lunch"}</span>
            <span>{mealType === "supper" && "Kolacja"}</span>
            {mealList[mealType as keyof MealListType].length > 0 && (
              <ul className="tracker__meal-list">
                {mealList[mealType as keyof MealListType].map((meal) => {
                  return (
                    <li className="tracker__meal-item" key={meal.id}>
                      <p>{meal.productName}</p>
                      <p>Ilość: {meal.amount}</p>
                      <p>Wartość energetyczna: {meal.energyValue}</p>
                      <p>Białko: {meal.proteins}</p>
                      <button onClick={() => handleDelete(mealType, meal.id!)}>
                        Usuń
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            <Plus onClick={() => showProductsList(mealType)} width="3%" />
          </div>
        );
      })}
      {isVisible && (
        <div>
          <input type="number" value={amount} onChange={handleAmount} min={0} />
          <ProductsList onClickHandle={addProductToList} />
        </div>
      )}
    </div>
  );
};
