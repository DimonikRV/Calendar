import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { days } from '../../utils/dateUtils.js';
import './navigation.scss';

const Navigation = ({ weekDates }) => {
  return (
    <>
      <header className="calendar__header">
        {weekDates.map(dayDate => {
          const date = new Date(dayDate).getDate();
          const currentDate =
            new Date().getDay() === new Date(dayDate).getDay() && new Date().getDate() === date;

          return (
            <div className="calendar__day-label day-label" key={date}>
              <span
                className={classNames('day-label__day-name', {
                  'day-label__day-name_match': currentDate,
                })}
              >
                {days[dayDate.getDay()]}
              </span>
              <span
                className={classNames('day-label__day-number', {
                  'day-label__day-number_match': currentDate,
                })}
              >
                {dayDate.getDate()}
              </span>
            </div>
          );
        })}
      </header>
      <div className="time-zone">GMT+02</div>
    </>
  );
};
Navigation.propTypes = {
  weekDates: PropTypes.array.isRequired,
};
export default Navigation;
