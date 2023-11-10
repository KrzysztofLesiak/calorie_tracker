import { useDate } from "../../hooks/useDate";
import { ProductsList } from "../ProductsList";
import Plus from "../../assets/plus-solid.svg?react";
import "./Tracker.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import { addToList, getMealList } from "../../utils/firebase/firebase";
import { UserContext } from "../../context/UserContext";
import { ProductType } from "../../context/ProductContext";

export type MealListType = {
  date: string;
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
    setCurrentDate,
    handleDateInput,
    changeWeek,
    formatDate,
  } = useDate();
  const [isVisible, setIsVisible] = useState(false);
  const [meal, setMeal] = useState("");
  const [mealList, setMealList] = useState({
    date: currentDate,
    breakfast: [],
    secondBreakfast: [],
    dinner: [],
    lunch: [],
    supper: [],
  } as MealListType);

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
    const quantity = 200;
    if (user) {
      await addToList(user.uid, currentDate, meal, id, quantity);
    }
    getMeal();
  };

  const showProductsList = (meal: string) => {
    setMeal(meal);
    setIsVisible(true);
  };

  useEffect(() => {
    if (currentDate) {
      getMeal();
    }
  }, [currentDate, getMeal]);

  return (
    <div className="tracker">
      <div className="tracker__date-picker">
        <input
          type="date"
          value={currentDate}
          onChange={handleDateInput}
          pattern="\d{4}-\d{2}-\d{2}"
        />
        {week && (
          <ul>
            {week.map((day) => {
              return (
                <li
                  key={day.getDate()}
                  className={
                    formatDate(day) === currentDate ? "date_active" : ""
                  }
                  onClick={() => handleDateSelect(day)}
                >
                  {DAYS_OF_THE_WEEK[day.getDay()]} - {day.getDate()}.
                  {day.getMonth() + 1}
                </li>
              );
            })}
          </ul>
        )}
        <button onClick={() => changeWeek(1)}>poprzedni</button>
        <button onClick={() => changeWeek(-1)}>nastepny</button>
      </div>
      <div>
        <span>Śniadanie</span>
        {mealList.breakfast.length > 0 && (
          <ul>
            {mealList.breakfast.map((meal) => {
              return <li>{meal.productName}</li>;
            })}
          </ul>
        )}
        <Plus onClick={() => showProductsList("breakfast")} width="3%" />
      </div>
      <div>
        <span>Lunch</span>
        {mealList.lunch.length > 0 && (
          <ul>
            {mealList.lunch.map((meal) => {
              return <li>{meal.productName}</li>;
            })}
          </ul>
        )}
        <Plus onClick={() => showProductsList("lunch")} width="3%" />
      </div>
      <div>
        {isVisible && <ProductsList onClickHandle={addProductToList} />}
      </div>
    </div>
  );
};
