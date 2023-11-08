import { useDate } from "../../hooks/useDate";
import "./Tracker.scss";

export const Tracker = () => {
  const {
    currentDate,
    DAYS_OF_THE_WEEK,
    week,
    setCurrentDate,
    handleDateInput,
    changeWeek,
    formatDate,
  } = useDate();

  const handleDateSelect = (date: Date) => {
    setCurrentDate(formatDate(date));
  };

  return (
    <div className="tracker">
      <input
        type="date"
        value={currentDate}
        onChange={handleDateInput}
        pattern="\d{4}-\d{2}-\d{2}"
      />
      {week.length > 0 ? (
        week.map((day) => {
          return (
            <p
              key={DAYS_OF_THE_WEEK[day.getDay()]}
              className={formatDate(day) === currentDate ? "date_active" : ""}
              onClick={() => handleDateSelect(day)}
            >
              {DAYS_OF_THE_WEEK[day.getDay()]} - {day.getDate()}.
              {day.getMonth() + 1}
            </p>
          );
        })
      ) : (
        <></>
      )}
      <button onClick={() => changeWeek(1)}>poprzedni</button>
      <button onClick={() => changeWeek(-1)}>nastepny</button>
    </div>
  );
};
