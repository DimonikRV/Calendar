import React, { useState, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Event from "../event/Event";
import { formatMins } from "../../../src/utils/dateUtils.js";

const Hour = ({ dataHour, dataDay, hourEvents, setEvents, currentEvent }) => {
  const [currentMinute, setCurrentMinute] = useState(
    moment(new Date()).minute()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMinute(moment(new Date()).minute());
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const isRedLine =
    moment(new Date()).hour() === dataHour &&
    moment(new Date()).date() === dataDay;

  return (
    <div
      className="calendar__time-slot"
      style={{
        position: "relative",
      }}
      data-time={dataHour}
    >
      {isRedLine && (
        <div
          className="time-counter"
          style={{
            position: "absolute",
            marginTop: `${currentMinute}px`,
            background: "red",
            width: "100%",
            height: "1px",
          }}
        ></div>
      )}

      {hourEvents &&
        hourEvents.map(({ id, dateFrom, dateTo, title }) => {
          const eventStart = `${new Date(dateFrom).getHours()}:${formatMins(
            new Date(dateFrom).getMinutes()
          )}`;
          const eventEnd = `${new Date(dateTo).getHours()}:${formatMins(
            new Date(dateTo).getMinutes()
          )}`;

          return (
            <>
              <Event
                key={id}
                //calculating event height = duration of event in minutes
                height={
                  (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) /
                  (1000 * 60)
                }
                top={new Date(dateFrom).getMinutes()}
                time={`${eventStart} - ${eventEnd}`}
                title={title}
                hourEvents={hourEvents}
                dataEvent={id}
                setEvents={setEvents}
                currentEvent={currentEvent}
              />
            </>
          );
        })}
    </div>
  );
};
// Hour.propTypes = {
//   dataHour: PropTypes.number.isRequired,
//   dataDay: PropTypes.number.isRequired,
//   hourEvents: PropTypes.array.isRequired,
//   setEvents: PropTypes.func.isRequired,
// };
// Hour.defaultProps = {
//   hourEvents: [],
// };
export default Hour;
