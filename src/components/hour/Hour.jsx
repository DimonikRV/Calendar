import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Event from '../event/Event';
import './hour.scss';

const Hour = ({ dataHour, dataDay, hourEvents, setEvents }) => {
  const [currentMinute, setCurrentMinute] = useState(moment(new Date()).minute());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMinute(moment(new Date()).minute());
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const isRedLine = moment(new Date()).hour() === dataHour && moment(new Date()).date() === dataDay;

  return (
    <div className="calendar__time-slot" data-time={dataHour}>
      {isRedLine && (
        <div
          className="time-counter"
          style={{
            position: 'absolute',
            right: '4px',
            display: 'flex',
            alignItems: 'center',
            marginTop: `${currentMinute}px`,
            background: 'red',
            width: '100%',
            height: '1px',
          }}
        ></div>
      )}

      {hourEvents &&
        hourEvents.map(({ id, dateFrom, dateTo, title }) => {
          const eventStart = moment(dateFrom).format('HH:mm');
          const eventEnd = moment(dateTo).format('HH:mm');

          return (
            <Event
              key={id}
              height={(new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60)}
              top={moment(dateFrom).minute()}
              time={`${eventStart} - ${eventEnd}`}
              title={title}
              setEvents={setEvents}
              id={id}
            />
          );
        })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  dataDay: PropTypes.number.isRequired,
  hourEvents: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired,
};
Hour.defaultProps = {
  hourEvents: [],
};

export default Hour;
