import React, { useState } from "react";
import { getDateFromEvent } from "../../utils/dateUtils.js";
import { renderEvents, postEvent } from "../../gateway/events";
import "./modal.scss";

const Modal = ({ isVisible, handleCloseModal, setVisibility }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { date, startTime, endTime, description, title } = formData;

  const handleFocus = (event) => {
    event.target.placeholder = "";
  };
  const handleBlur = (event) => {
    if (event.target.name === "title") {
      event.target.placeholder = "Event";
    } else if (event.target.name === "description") {
      event.target.placeholder = "Description";
    }
  };

  const handleSubmitEvent = () => {
    const dateFrom = getDateFromEvent(date, startTime);
    const dateTo = getDateFromEvent(date, endTime);
    const newEvent = {
      title,
      description,
      dateFrom,
      dateTo,
    };

    const eventForm = document.querySelector(".event-form");

    postEvent(newEvent)
      .then(renderEvents())
      .then(() => setVisibility(false))
      .then(() => eventForm.reset())
      .catch((error) => alert(error.message));
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
              placeholder="Event"
              className="event-form__field-title"
              value={title}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field-date"
                value={date}
                onChange={handleChange}
                required
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field-time"
                value={startTime}
                onChange={handleChange}
                required
              />
              <span> - </span>
              <input
                type="time"
                name="endTime"
                className="event-form__field-time"
                value={endTime}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              name="description"
              className="event-form__field-description"
              placeholder="Description"
              value={description}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
