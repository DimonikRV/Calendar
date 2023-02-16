import React from "react";
import "./navigation.scss";
import classNames from "classnames";
import { days } from "../../utils/dateUtils.js";

const Navigation = ({ weekDates }) => {
  return (
    <>
      <header className="calendar__header">
        {weekDates.map((dayDate) => {
          const currentDate =
            new Date().getDate() === new Date(dayDate).getDate();
          const currentDay = new Date().getDay() === new Date(dayDate).getDay();
          return (
            <div className="calendar__day-label day-label">
              <span
                className={classNames("day-label__day-name", {
                  "day-label__day-name_match": currentDay,
                })}
              >
                {days[dayDate.getDay()]}
              </span>
              <span
                className={classNames("day-label__day-number", {
                  "day-label__day-number_match": currentDate,
                })}
              >
                {dayDate.getDate()}
              </span>
            </div>
          );
        })}
      </header>
      <div className="time-zone">GMT+02</div>
    </>
  );
};

export default Navigation;
