import { useContext } from "react";
import Chevron from "../../../assets/chevron-up-solid.svg?react";
import { TrackerContext } from "../../../context/TrackerContext";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";

import "./DatePicker.scss";
import { useTranslation } from "react-i18next";

export const DatePicker = () => {
  const { i18n } = useTranslation();
  const {
    currentDate,
    DAYS_OF_THE_WEEK,
    week,
    date,
    isOpen,
    setIsOpen,
    handleDateSelect,
    formatDate,
    handleDateInput,
    changeWeek
  } = useContext(TrackerContext);
  return (
    <div className="date-picker">
      <div className="date-picker__input-container">
        <Chevron
          className="date-picker__arrow date-picker__arrow--previous"
          onClick={() => changeWeek(1)}
        />
        <div className="">
          <ReactDatePicker
            locale={i18n.language === "pl" ? pl : ""}
            wrapperClassName="date-picker__date-input"
            onChange={(date) => {
              if (date) handleDateInput(date);
            }}
            selected={currentDate}
            open={isOpen}
          />
          <span
            className="date-picker__date"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {date}
          </span>
        </div>
        <Chevron
          className="date-picker__arrow date-picker__arrow--next"
          onClick={() => changeWeek(-1)}
        />
      </div>
      {week && (
        <ul className="date-picker__days-list">
          {week.map((day) => {
            return (
              <li
                key={day.getDate()}
                className={
                  formatDate(day) === formatDate(currentDate)
                    ? "date-picker__days-item date-picker__days-item--active"
                    : "date-picker__days-item"
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
  );
};
