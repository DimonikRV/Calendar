import React, { useState } from "react";
import { getDateFromEvent } from "../../utils/dateUtils.js";
import { getEvents, setEvent } from "../../gateway/events";
import "./modal.scss";

const Modal = ({ isVisible, handleCloseModal }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartTime, setEventStartTime] = useState(null);
  const [eventEndTime, setEventEndTime] = useState(null);
  const [eventDescription, setEventDescription] = useState("");

  let eventDateValue = new Date();

  const handleChange = (event) => {
    const { name, value, valueAsDate } = event.target;

    switch (name) {
      case "date":
        eventDateValue = valueAsDate;
        break;
      case "startTime":
        setEventStartTime(getDateFromEvent(valueAsDate, eventDateValue));
        break;
      case "endTime":
        setEventEndTime(getDateFromEvent(valueAsDate, eventDateValue));
        break;
      case "title":
        setEventTitle(value);
        break;
      case "description":
        setEventDescription(value);
        break;
    }
  };
  const handleSubmitEvent = (event) => {
    event.preventDefault();
    const newEvent = {
      title: eventTitle,
      description: eventDescription,
      dateFrom: eventStartTime,
      dateTo: eventEndTime,
    };

    setEvent(newEvent)
      .then(() => getEvents())
      .catch((error) => console.log(error.message));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            className="create-event__close-btn"
            onClick={handleCloseModal}
          >
            +
          </button>
          <form className="event-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={eventTitle}
              onChange={handleChange}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                valueAsDate={eventDateValue}
                onChange={handleChange}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                valueAsDate={eventStartTime}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                valueAsDate={eventEndTime}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={eventDescription}
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              className="event-form__submit-btn"
              onClick={handleSubmitEvent}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
