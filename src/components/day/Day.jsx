import React from 'react';
import Hour from '../hour/Hour';
import PropTypes from 'prop-types';
import moment from 'moment';
import { hours, getCurrentEndHour, fillModalData, getCurrentDate } from '../../utils/dateUtils';
import './day.scss';

const Day = ({ dayStart, dayEvents, setEvents, handelModalOpen, setFormData, currentMonth }) => {
  const dataDay = moment(dayStart).date();

  return (
    <div
      className="calendar__day"
      data-day={dataDay}
      onClick={event =>
        fillModalData({
          event,
          dayStart,
          setFormData,
          getCurrentEndHour,
          handelModalOpen,
          getCurrentDate,
        })
      }
    >
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => moment(event.dateFrom).hour() === hour);

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            dataDay={dataDay}
            currentMonth={currentMonth}
            hourEvents={hourEvents}
            setEvents={setEvents}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dayEvents: PropTypes.array,
  dayStart: PropTypes.string.isRequired,
  currentMonth: PropTypes.number.isRequired,
  setEvents: PropTypes.func.isRequired,
  handelModalOpen: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};
Day.defaultProps = {
  dayEvents: [],
};
export default Day;
