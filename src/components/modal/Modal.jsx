import React, { useState } from "react";
import moment from "moment";
import { getDateFromEvent } from "../src/utils/dateUtils.js";

import "./modal.scss";

const Modal = ({ isVisible, handleCloseModal }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartTime, setEventStartTime] = useState(null);
  const [eventEndTime, setEventEndTime] = useState(null);
  const [eventDescription, setEventDescription] = useState("");

  const handleChange = (event) => {
    const { name, value, valueAsDate } = event.target;

    let eventDateValue = new Date();

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
                onChange={handleChange}
              />
              <div className="event-form__time">
                <input
                  type="date"
                  name="date"
                  className="event-form__field"
                  onChange={handleChange}
                />
                <input
                  type="time"
                  name="startTime"
                  className="event-form__field"
                  onChange={handleChange}
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  className="event-form__field"
                  onChange={handleChange}
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                className="event-form__field"
                onChange={handleChange}
              ></textarea>
              <button type="submit" className="event-form__submit-btn">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
};
export default Modal;
