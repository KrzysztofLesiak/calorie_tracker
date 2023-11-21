import {
  ChangeEvent,
  createContext,
  JSX,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { MealListType } from "../components/Tracker";
import { useNavigate, useParams } from "react-router-dom";
import { useDate } from "../hooks/useDate";
import { UserContext } from "./UserContext";
import { addToList, deleteMeal, getMealList } from "../utils/firebase/firebase";

type TrackerProviderProps = {
  children: JSX.Element;
};

type TrackerProviderData = {
  mealList: MealListType;
  productId: string | undefined;
  amount: string;
  isVisible: boolean;
  MEAL_TYPES: string[];
  currentDate: string;
  DAYS_OF_THE_WEEK: string[];
  week: Date[];
  date: string;
  handleDateSelect: (date: Date) => Promise<void>;
  showProductsList: (meal: string) => void;
  handleDelete: (mealType: string, id: string) => Promise<void>;
  onClickProductPreview: (id: string) => void;
  handleAmount: (event: ChangeEvent<HTMLInputElement>) => void;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  addProductToList: (id: string) => Promise<void>;
  formatDate: (date: Date) => string;
  handleDateInput: (event: ChangeEvent<HTMLInputElement>) => void;
  changeWeek: (direction: number) => void;
};

const MEAL_TYPES = [
  "breakfast",
  "secondBreakfast",
  "dinner",
  "lunch",
  "supper",
];

export const TrackerContext = createContext({} as TrackerProviderData);

export const TrackerProvider = ({ children }: TrackerProviderProps) => {
  const [meal, setMeal] = useState("");
  const [mealList, setMealList] = useState({
    breakfast: [],
    secondBreakfast: [],
    dinner: [],
    lunch: [],
    supper: [],
  } as MealListType);
  const [amount, setAmount] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { user } = useContext(UserContext);
  const {
    currentDate,
    DAYS_OF_THE_WEEK,
    week,
    date,
    setCurrentDate,
    formatDate,
    handleDateInput,
    changeWeek,
  } = useDate();

  const { productId } = useParams();
  const navigate = useNavigate();

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
    if (user && parseFloat(amount) > 0) {
      await addToList(
        user.uid,
        currentDate,
        meal,
        id,
        parseFloat(amount) / 100
      );
      setAmount("");

      setIsVisible(false);
      getMeal();
      navigate("/app");
    }
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
    if (event.target.value) setAmount(event.target.value);
  };

  const onClickProductPreview = (id: string) => {
    navigate(`/app/${id}`);
  };

  useEffect(() => {
    if (currentDate) {
      getMeal();
    }
  }, [currentDate, getMeal]);

  return (
    <TrackerContext.Provider
      value={{
        mealList,
        productId,
        amount,
        isVisible,
        MEAL_TYPES,
        currentDate,
        DAYS_OF_THE_WEEK,
        week,
        date,
        handleDateSelect,
        showProductsList,
        handleDelete,
        handleAmount,
        onClickProductPreview,
        setIsVisible,
        addProductToList,
        formatDate,
        handleDateInput,
        changeWeek,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};
