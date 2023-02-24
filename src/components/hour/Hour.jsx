import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Event from "../event/Event";
import { formatMins } from "../../../src/utils/dateUtils.js";

const Hour = ({ dataHour, dataDay, hourEvents, setVisibility }) => {
  const onCreateEventHandle = () => {
    setVisibility(true);
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  const minutes = new Array(60).fill().map((val, index) => index);

  const currentTime = (function () {
    const curDate = new Date(new Date().setDate(dataDay)).setHours(dataHour);
    return curDate;
  })();

  useEffect(() => {
    const interval = setTimeout(() => setCurrentDate(new Date()), 6000);
    return () => clearInterval(interval);
  }, [new Date()]);

  const isRedLine = currentTime === currentDate.getTime();

  const minuteTime = classNames("minute", { "time-counter": isRedLine });

  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      onClick={onCreateEventHandle}
    >
      {
        minutes.map((minute) => {
          return <div className={minuteTime} key={dataHour + minute}></div>;
        })

        // return (
        //   <Hour
        //     key={dataDay + hour}
        //     dataHour={hour}
        //     hourEvents={hourEvents}
        //     setVisibility={setVisibility}
        //     dataDay={dataDay}
        //   />
        // );
      }
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
                marginTop={new Date(dateFrom).getMinutes()}
                time={`${eventStart} - ${eventEnd}`}
                title={title}
                hourEvents={hourEvents}
                dataEvent={id}
              />
            </>
          );
        })}
    </div>
  );
};

export default Hour;
