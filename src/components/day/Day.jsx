import React from 'react';
import Hour from '../hour/Hour';
import PropTypes from 'prop-types';
import moment from 'moment';
import './day.scss';

const Day = ({ dataDay, dayEvents, setEvents, eventChecked }) => {
  const hours = new Array(24).fill().map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => moment(event.dateFrom).hour() === hour);

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            dataDay={dataDay}
            hourEvents={hourEvents}
            setEvents={setEvents}
            eventChecked={eventChecked}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dayEvents: PropTypes.array,
  dataDay: PropTypes.number.isRequired,
  setEvents: PropTypes.func.isRequired,
  eventChecked: PropTypes.object.isRequired,
};
Day.defaultProps = {
  dayEvents: [],
};
export default Day;
