import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';
import { renderEvents } from '../../gateway/events';
import './calendar.scss';

const Calendar = ({ generateWeekDates, isVisible, handleCloseModal, setVisibility }) => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    renderEvents(setEvents);
  }, []);

  const closeDelBtn = event => {};

  const weekDates = generateWeekDates();

  if (!events) {
    return null;
  }

  return (
    <section className="calendar" onClick={closeDelBtn}>
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            setVisibility={setVisibility}
            setEvents={setEvents}
          />
        </div>
        <Modal
          isVisible={isVisible}
          handleCloseModal={handleCloseModal}
          setEvents={setEvents}
          setVisibility={setVisibility}
        />
      </div>
    </section>
  );
};

Calendar.propTypes = {
  generateWeekDates: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

export default Calendar;
