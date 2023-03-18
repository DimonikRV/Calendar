import React, { useState, useCallback } from 'react';
import Header from './components/header/Header';
import Calendar from './components/calendar/Calendar';

import {
  getWeekStartDate,
  generateWeekRange,
  getCurrentMonths,
  months,
} from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [visibility, setVisibility] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const generateWeekDates = useCallback(
    () => generateWeekRange(getWeekStartDate(startDate)),
    [startDate],
  );

  const currentMonths = getCurrentMonths(generateWeekDates, months);

  const changeStartDate = date => setStartDate(date);

  const handelCreateEvent = () => {
    setVisibility(true);
  };
  const handleCloseModal = () => {
    setVisibility(!visibility);
  };

  return (
    <>
      <Header
        generateWeekDates={generateWeekDates}
        changeStartDate={changeStartDate}
        startDate={startDate}
        handelCreateEvent={handelCreateEvent}
        currentMonths={currentMonths}
      />
      <Calendar
        generateWeekDates={generateWeekDates}
        isVisible={visibility}
        handleCloseModal={handleCloseModal}
        setVisibility={setVisibility}
      />
    </>
  );
};

export default App;
