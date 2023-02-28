import React from "react";
import Hour from "../hour/Hour";
import PropTypes from "prop-types";
import "./day.scss";

const Day = ({ dataDay, dayEvents, setEvents, checked }) => {
  const hours = new Array(24).fill().map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => new Date(event.dateFrom).getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            dataDay={dataDay}
            setEvents={setEvents}
            currentEvent={checked}
          />
        );
      })}
    </div>
  );
};

// Day.propTypes = {
//   dayEvents: PropTypes.array,
//   dataDay: PropTypes.number.isRequired,
//   setEvents: PropTypes.func.isRequired,
// };
// Day.defaultProps = {
//   dayEvents: [],
// };
export default Day;
