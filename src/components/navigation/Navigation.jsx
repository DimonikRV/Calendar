import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { days } from '../../utils/dateUtils.js';
import './navigation.scss';

const Navigation = ({ weekDates }) => {
  return (
    <>
      <header className="calendar__header">
        {weekDates.map(dayDate => {
          const date = moment(dayDate).date();
          const currentDate = moment().day() === moment(dayDate).day() && moment().date() === date;

          return (
            <div className="calendar__day-label day-label" key={date}>
              <span
                className={classNames('day-label__day-name', {
                  'day-label__day-name_match': currentDate,
                })}
              >
                {days[moment(dayDate).day()]}
              </span>
              <span
                className={classNames('day-label__day-number', {
                  'day-label__day-number_match': currentDate,
                })}
              >
                {moment(dayDate).date()}
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
