import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type UseDateData = {
  currentDate: Date;
  DAYS_OF_THE_WEEK: string[];
  week: Date[];
  date: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  handleDateInput: (date: Date) => void;
  changeWeek: (direction: number) => void;
  formatDate: (date: Date) => string;
};

export const DATE = new Date();

export const useDate = (): UseDateData => {
  const { i18n } = useTranslation();
  const [currentDate, setCurrentDate] = useState<Date>(DATE);
  const [date, setDate] = useState(
    new Intl.DateTimeFormat("en-EN", {
      month: "long",
      year: "numeric"
    }).format(DATE)
  );
  const [week, setWeek] = useState<Date[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const DAYS_OF_THE_WEEK = i18n.t("daysOfTheWeek", {
    returnObjects: true
  }) as string[];

  const formatDate = (date: Date) => {
    const dateFormat = `${date.getFullYear()}-${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;

    return dateFormat;
  };

  const handleDateInput = (date: Date) => {
    setCurrentDate(date);
    setIsOpen(false);
  };

  const changeWeek = (direction: number) => {
    if (Math.abs(direction) !== 1) throw new Error();
    else if (!currentDate) return;

    const newDate = new Date(
      currentDate.getTime() - direction * 7 * 24 * 60 * 60 * 1000
    );

    setCurrentDate(newDate);
  };

  useEffect(() => {
    if (!currentDate) return;

    const newDate = new Date(currentDate);
    setDate(
      new Intl.DateTimeFormat(
        `${i18n.language}-${i18n.language.toUpperCase()}`,
        {
          month: "long",
          year: "numeric"
        }
      ).format(newDate)
    );
    const startDate = new Date(
      newDate.getTime() -
        (newDate.getDay() === 0 ? newDate.getDay() + 6 : newDate.getDay() - 1) *
          24 *
          60 *
          60 *
          1000
    );
    const weekList = [];
    for (let i = 0; i < 7; i++) {
      weekList.push(new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000));
    }
    setWeek(weekList);
  }, [currentDate, i18n.language]);

  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat(
        `${i18n.language}-${i18n.language.toUpperCase()}`,
        {
          month: "long",
          year: "numeric"
        }
      ).format(DATE)
    );
  }, [i18n.language]);

  return {
    currentDate,
    DAYS_OF_THE_WEEK,
    week,
    date,
    isOpen,
    setIsOpen,
    setCurrentDate,
    handleDateInput,
    changeWeek,
    formatDate
  };
};
