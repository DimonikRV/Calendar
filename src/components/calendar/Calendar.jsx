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
  handleModalOpen: PropTypes.func,
  setVisibility: PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired,
  events: PropTypes.array,
};
Calendar.defaultProps = {
  events: [],
};
export default Calendar;
