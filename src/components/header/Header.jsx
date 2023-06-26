import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  getWeekStartDate,
  fillModalData,
  getCurrentDate,
  getCurrentEndHour,
} from '../../utils/dateUtils';
import './header.scss';
import Button from '../UI/button/Button';

const Header = ({
  startDate,
  handelModalOpen,
  currentMonths,
  changeStartDate,
  generateWeekDates,
  setFormData,
}) => {
  const handelChangeWeek = event => {
    if (event.target.classList.contains('fa-chevron-left')) {
      changeStartDate(moment(getWeekStartDate(startDate)).subtract(7, 'days'));
    } else {
      changeStartDate(moment(getWeekStartDate(startDate)).add(7, 'days'));
    }
    generateWeekDates();
  };

  const handelCurrentWeek = () => {
    changeStartDate(moment());
    generateWeekDates();
  };

  return (
    <header className="header">
      <Button
        buttonColor={true}
        button_margin={true}
        onClick={() =>
          fillModalData({ getCurrentDate, handelModalOpen, setFormData, getCurrentEndHour })
        }
      >
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </Button>
      <div className="navigation">
        <Button buttonColor={false} button_margin={false} onClick={handelCurrentWeek}>
          Today
        </Button>
        <button className="icon-button navigation__nav-icon" onClick={handelChangeWeek}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={handelChangeWeek}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{currentMonths}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  generateWeekDates: PropTypes.func.isRequired,
  changeStartDate: PropTypes.func.isRequired,
  startDate: PropTypes.object.isRequired,
  handelCreateEvent: PropTypes.func.isRequired,
  currentMonths: PropTypes.string.isRequired,
};

export default Header;
