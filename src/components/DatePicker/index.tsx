import { useContext } from "react";
import Chevron from "../../assets/chevron-up-solid.svg?react";
import { TrackerContext } from "../../context/TrackerContext";

import "./DatePicker.scss";

export const DatePicker = () => {
  const {
    currentDate,
    DAYS_OF_THE_WEEK,
    week,
    date,
    handleDateSelect,
    formatDate,
    handleDateInput,
    changeWeek,
  } = useContext(TrackerContext);
  return (
    <div className="date-picker">
      <div className="date-picker__input-container">
        <Chevron
          className="date-picker__arrow date-picker__arrow--previous"
          onClick={() => changeWeek(1)}
        />
        <div className="">
          <input
            className="date-picker__date-input"
            type="date"
            value={currentDate}
            onChange={handleDateInput}
            pattern="\d{4}-\d{2}-\d{2}"
          />
          <span className="date-picker__date">{date}</span>
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
                  formatDate(day) === currentDate
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
