import React, { useState, useEffect } from "react";
import Day from "../day/Day";
import PropTypes from "prop-types";
import "./week.scss";

const Week = ({ weekDates, events, setVisibility, setEvents }) => {
  const [checked, setChecked] = useState(false);
  let currentEvent;

  const handleChoose = (event) => {
    event.stopPropagation();
    currentEvent = event.target.closest(".event").dataset.event;
    setChecked({
      [currentEvent]: true,
    });
  };

  const onCreateEventHandle = (event) => {
    if (!event.target.classList.contains(".delete-event-btn")) {
      closeDeleteBtn();
    }
    setVisibility(true);
  };

  return (
    <div className="calendar__week" onClick={handleChoose}>
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        //getting all events from the day we will render
        const dayEvents = events.filter(
          (event) =>
            new Date(event.dateFrom) > dayStart &&
            new Date(event.dateTo) < dayEnd
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            setEvents={setEvents}
            checked={checked}
          />
        );
      })}
    </div>
  );
};
// Week.propTypes = {
//   setVisibility: PropTypes.func.isRequired,
//   events: PropTypes.array,
//   weekDates: PropTypes.array.isRequired,
//   setEvents: PropTypes.func.isRequired,
// };
// Week.defaultProps = {
//   events: [],
// };
export default Week;
