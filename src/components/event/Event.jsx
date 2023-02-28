import React, { useState } from "react";
import PropTypes from "prop-types";
import { deleteEvent, renderEvents } from "../../gateway/events";
import "./event.scss";

const Event = ({
  height,
  top,
  title,
  time,
  hourEvents,
  dataEvent,
  setEvents,
  currentEvent,
}) => {
  const handleDeleteEvent = (event) => {
    const dataEvent = event.target.closest(".event").dataset.event;
    const { id } = hourEvents.find((event) => event.id === dataEvent);

    deleteEvent(id).then(renderEvents(setEvents));
  };

  const eventStyle = {
    height,
    top,
    zIndex: "2",
    position: "absolute",
    cursor: "pointer",
  };

  let checked;
  const [keyEvent, value] = Object.entries(currentEvent).reduce(
    (acc, curEvent) => acc.concat(curEvent),
    []
  );

  if (keyEvent === dataEvent) {
    checked = value;
  }
  return (
    <div className="event" style={eventStyle} data-event={dataEvent}>
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
// Event.propTypes = {
//   dataEvent: PropTypes.number.isRequired,
//   hourEvents: PropTypes.array.isRequired,
//   time: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   height: PropTypes.number.isRequired,
//   top: PropTypes.number.isRequired,
//   setEvents: PropTypes.func.isRequired,
// };
// Event.defaultProps = {
//   hourEvents: [],
// };
export default Event;
