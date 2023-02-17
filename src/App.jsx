import React, { useState } from "react";
import moment from "moment";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import Modal from "./components/modal/Modal.jsx";

import {
  getWeekStartDate,
  generateWeekRange,
  getCurrentMonths,
  months,
} from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [visibility, setVisibility] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const startWeekDate = getWeekStartDate(startDate);

  let weekDates = generateWeekRange(startWeekDate);

  const handelChangeWeek = (event) => {
    if (event.target.classList.contains("fa-chevron-left")) {
      setStartDate(
        moment(getWeekStartDate(startDate)).subtract(7, "days").format()
      );
    } else {
      setStartDate(moment(getWeekStartDate(startDate)).add(7, "days").format());
    }
    weekDates = generateWeekRange(getWeekStartDate(startDate));
  };

  const handelCurrentWeek = () => {
    setStartDate(new Date());
    weekDates = generateWeekRange(getWeekStartDate(startDate));
  };
  const currentMonths = getCurrentMonths(weekDates, months);

  const handelCreateEvent = () => {
    setVisibility(true);
  };
  const handleCloseModal = () => {
    setVisibility(!visibility);
  };

  return (
    <>
      <Header
        handelChangeWeek={handelChangeWeek}
        handelCurrentWeek={handelCurrentWeek}
        handelCreateEvent={handelCreateEvent}
        currentMonths={currentMonths}
      />
      <Calendar weekDates={weekDates} />
      <Modal isVisible={visibility} handleCloseModal={handleCloseModal} />
    </>
  );
};

export default App;
