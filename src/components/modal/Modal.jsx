import React, { useState } from 'react';
import ErrorMessage from '../errors/error_message/ErrorMessage.jsx';
import { getDateFromEvent } from '../../utils/dateUtils.js';
import { isMultipleOfFifteen, validateTimeMultFifteen } from '../../utils/validate.requirements.js';
import { renderEvents, postEvent } from '../../gateway/events';
import PropTypes from 'prop-types';
import './modal.scss';

const Modal = ({ isVisible, handleCloseModal, setVisibility, setEvents }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
  });
  const [validate, setValidate] = useState(true);
  const handleChange = event => {
    const { name, value } = event.target;

    const changedFormData = {
      ...formData,
      [name]: value,
    };

    if (changedFormData.startTime && changedFormData.endTime) {
      setValidate(validateTimeMultFifteen(isMultipleOfFifteen, changedFormData));
    }

    setFormData(changedFormData);
  };

  const { date, startTime, endTime, description, title } = formData;

  const handleFocus = event => {
    event.target.placeholder = '';
  };
  const handleBlur = event => {
    if (event.target.name === 'title') {
      event.target.placeholder = 'Event';
    } else if (event.target.name === 'description') {
      event.target.placeholder = 'Description';
    }
  };

  const handleSubmitEvent = event => {
    event.preventDefault();
    const dateFrom = getDateFromEvent(date, startTime);
    const dateTo = getDateFromEvent(date, endTime);
    const newEvent = {
      title,
      description,
      dateFrom,
      dateTo,
    };

    postEvent(newEvent)
      .then(() => renderEvents(setEvents))
      .then(() => setVisibility(false))
      .then(() =>
        setFormData({
          title: '',
          date: '',
          startTime: '',
          endTime: '',
          description: '',
        }),
      )
      .catch(error => alert(error.message));
  };
  const resetForm = () => {
    handleCloseModal();
    setFormData({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={() => resetForm()}>
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
              {!validate && <ErrorMessage message={'choose time multiple of 15 minutes'} />}
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
              disabled={!validate}
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

Modal.propTypes = {
  isVisible: PropTypes.bool,
  handleCloseModal: PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

export default Modal;
