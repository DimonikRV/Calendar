import React from 'react';
import Hour from '../hour/Hour';
import PropTypes from 'prop-types';
import './day.scss';

const Day = ({ dataDay, dayEvents, setEvents, checked }) => {
  const hours = new Array(24).fill().map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => new Date(event.dateFrom).getHours() === hour);

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            dataDay={dataDay}
            setEvents={setEvents}
            checked={checked}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dayEvents: PropTypes.array,
  currentEvent: PropTypes.number,
  dataDay: PropTypes.number.isRequired,
  setEvents: PropTypes.func.isRequired,
  checked: PropTypes.object.isRequired,
};
Day.defaultProps = {
  dayEvents: [],
};
export default Day;
