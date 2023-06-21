import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import Header from './components/header/Header';
import Calendar from './components/calendar/Calendar';
import Modal from './components/modal/Modal';
import { renderEvents } from './gateway/events';

import { getWeekStartDate, generateWeekRange, getCurrentMonths, months } from './utils/dateUtils';

import './common.scss';

const App = () => {
  const [visibility, setVisibility] = useState(false);
  const [startDate, setStartDate] = useState(moment());
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
  });

  const [events, setEvents] = useState(null);

  useEffect(() => {
    renderEvents(setEvents);
  }, []);

  const generateWeekDates = useCallback(
    () => generateWeekRange(getWeekStartDate(startDate)),
    [startDate],
  );

  const currentMonths = getCurrentMonths(generateWeekDates, months);

  const changeStartDate = date => setStartDate(date);

  const handelModalOpen = () => {
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
        handelModalOpen={handelModalOpen}
        currentMonths={currentMonths}
      />
      <Calendar
        generateWeekDates={generateWeekDates}
        handelModalOpen={handelModalOpen}
        setVisibility={setVisibility}
        setFormData={setFormData}
        setEvents={setEvents}
        events={events}
      />
      <Modal
        isVisible={visibility}
        handleCloseModal={handleCloseModal}
        setEvents={setEvents}
        setVisibility={setVisibility}
        setFormData={setFormData}
        formData={formData}
      />
    </>
  );
};

export default App;
