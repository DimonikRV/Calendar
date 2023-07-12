import React from 'react';
import moment from 'moment';
import Day from '../day/Day';
import PropTypes from 'prop-types';
import './week.scss';

const Week = ({ weekDates, events, setEvents, handelModalOpen, setFormData }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = moment(dayStart).endOf('day');

        const dayEvents = events.filter(
          event => moment(event.dateFrom) > moment(dayStart) && moment(event.dateTo) < dayEnd,
        );

        return (
          <Day
            key={moment(dayStart).date()}
            dayStart={dayStart}
            dayEvents={dayEvents}
            setEvents={setEvents}
            handelModalOpen={handelModalOpen}
            setFormData={setFormData}
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
  handelModalOpen: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};
Week.defaultProps = {
  events: [],
};
export default Week;
