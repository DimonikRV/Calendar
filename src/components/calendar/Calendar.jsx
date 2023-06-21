import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import './calendar.scss';

const Calendar = ({
  generateWeekDates,
  setVisibility,
  handelModalOpen,
  setEvents,
  events,
  setFormData,
}) => {
  const weekDates = generateWeekDates();

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events || []}
            setVisibility={setVisibility}
            setEvents={setEvents}
            handelModalOpen={handelModalOpen}
            setFormData={setFormData}
          />
        </div>
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
