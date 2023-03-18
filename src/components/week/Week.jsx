import React, { useState } from 'react';
import Day from '../day/Day';
import PropTypes from 'prop-types';
import './week.scss';

const Week = ({ weekDates, events, setEvents }) => {
  const [eventChecked, setEventChecked] = useState({});
  let currentEvent;

  const handleChoose = event => {
    event.stopPropagation();
    if (!event.target.closest('.event')) {
      const buttnId = document.querySelector('.event').dataset.event;
      setEventChecked({
        [buttnId]: false,
      });
      return;
    }
    currentEvent = event.target.closest('.event').dataset.event;

    setEventChecked({
      [currentEvent]: true,
    });
  };

  return (
    <div className="calendar__week" onClick={handleChoose}>
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

        const dayEvents = events.filter(
          event => new Date(event.dateFrom) > dayStart && new Date(event.dateTo) < dayEnd,
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            setEvents={setEvents}
            eventChecked={eventChecked}
          />
        );
      })}
    </div>
  );
};
Week.propTypes = {
  events: PropTypes.array,
  weekDates: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
};
Week.defaultProps = {
  events: [],
};
export default Week;
