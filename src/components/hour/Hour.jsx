import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';
import './hour.scss';

const Hour = ({ dataHour, dataDay, hourEvents, setEvents, checked }) => {
  const [currentMinute, setCurrentMinute] = useState(moment(new Date()).minute());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMinute(moment(new Date()).minute());
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const isRedLine = moment(new Date()).hour() === dataHour && moment(new Date()).date() === dataDay;

  return (
    <div
      className="calendar__time-slot"
      style={{
        position: 'relative',
      }}
      data-time={dataHour}
    >
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
          const eventStart = `${new Date(dateFrom).getHours()}:${formatMins(
            new Date(dateFrom).getMinutes(),
          )}`;
          const eventEnd = `${new Date(dateTo).getHours()}:${formatMins(
            new Date(dateTo).getMinutes(),
          )}`;

          return (
            <>
              <Event
                key={id}
                height={(new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60)}
                top={new Date(dateFrom).getMinutes()}
                time={`${eventStart} - ${eventEnd}`}
                title={title}
                hourEvents={hourEvents}
                weekFirstEvent={id}
                setEvents={setEvents}
                checked={checked}
              />
            </>
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
  checked: PropTypes.object.isRequired,
};
Hour.defaultProps = {
  hourEvents: [],
};
export default Hour;
