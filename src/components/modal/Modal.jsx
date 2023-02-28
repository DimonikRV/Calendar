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

  const handleSubmitEvent = () => {
    const dateFrom = getDateFromEvent(date, startTime);
    const dateTo = getDateFromEvent(date, endTime);
    const newEvent = {
      title,
      description,
      dateFrom,
      dateTo,
    };

    postEvent(newEvent)
      .then(renderEvents())
      .then(() => setVisibility(false))
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
              value={title}
              onChange={handleChange}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={date}
                onChange={handleChange}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={startTime}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={endTime}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={description}
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
