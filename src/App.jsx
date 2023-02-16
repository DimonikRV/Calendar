import React, { useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";

import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const weekStartDate = new Date();
  const [date, setDate] = useState(weekStartDate);
  const weekDates = generateWeekRange(getWeekStartDate(date));

  const handelChangeWeek = (event) => {
    const shiftedWeekDates = event.target.classList.contains(
      "fas fa-chevron-left"
    )
      ? generateWeekRange(
          getWeekStartDate(new Date(date.getTime() - 604800000))
        )
      : generateWeekRange(
          getWeekStartDate(new Date(date.getTime() + 604800000))
        );

    setDate(shiftedWeekDates);
  };

  return (
    <>
      <Header handelChangeWeek={handelChangeWeek} />
      <Calendar weekDates={weekDates} />
    </>
  );
};

export default App;
