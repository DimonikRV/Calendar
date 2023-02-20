import React, { useState } from "react";
import { deleteEvent, renderEvents } from "../../gateway/events";
import "./event.scss";

const Event = ({ height, marginTop, title, time, hourEvents, dataEvent }) => {
  const [checked, setChecked] = useState(false);

  const handleChoose = () => {
    setChecked(true);
  };

  const handleDeleteEvent = (event) => {
    const dataEvent = event.target.closest("event").dataset.event;
    const { id } = hourEvents.find((event) => event.id === dataEvent);
    try {
      deleteEvent(id);
      renderEvents();
    } catch (error) {
      console.error(error.message);
    }
  };

  const eventStyle = {
    height,
    marginTop,
  };

  return (
    <div
      style={eventStyle}
      className="event"
      data-event={dataEvent}
      onClick={handleChoose}
    >
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {checked && (
        <div className="event__pop-up">
          <button className="event-close" onClick={handleDeleteEvent}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
          Delete
        </div>
      )}
    </div>
  );
};

export default Event;
