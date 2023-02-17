import React from "react";

import "./header.scss";

const Header = ({
  handelChangeWeek,
  handelCurrentWeek,
  handelCreateEvent,
  currentMonths,
}) => {
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={handelCreateEvent}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={handelCurrentWeek}
        >
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={handelChangeWeek}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={handelChangeWeek}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{currentMonths}</span>
      </div>
    </header>
  );
};

export default Header;
