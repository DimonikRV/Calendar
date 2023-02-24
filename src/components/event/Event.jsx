import React, { useState } from "react";
import { deleteEvent, renderEvents } from "../../gateway/events";
import "./event.scss";

const Event = ({ height, marginTop, title, time, hourEvents, dataEvent }) => {
  const [checked, setChecked] = useState(false);

  const handleChoose = () => {
    setChecked(true);
  };

  const handleDeleteEvent = (event) => {
    const dataEvent = event.target.closest(".event").dataset.event;
    const { id } = hourEvents.find((event) => event.id === dataEvent);

    deleteEvent(id).then(renderEvents());
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
      {" "}
      <div className="event-body">
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
      {checked && (
        <button
          className="delete-event-btn"
          onClick={handleDeleteEvent}
          style={{
            position: "absolute",
            top: `${height - 5}px`,
            left: "60px",
            display: "flex",
            alignItems: "center",
            padding: `10px 20px`,
            width: "200px",
            height: "50px",
            borderRadius: "8px",
            cursor: "pointer",
            border: "none",
            transition: "all .1s ease",
          }}
        >
          <i
            className="fa fa-trash"
            aria-hidden="true"
            style={{
              marginRight: "40px",
            }}
          ></i>
          <span
            className="pop-up__name"
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "black",
            }}
          >
            Delete
          </span>
        </button>
      )}
    </div>
  );
};

export default Event;
