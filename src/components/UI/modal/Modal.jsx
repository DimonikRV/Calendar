import React, { useState } from 'react';
import ErrorMessage from '../errors/error_message/ErrorMessage';
import { getDateFromEvent } from '../../../utils/dateUtils.js';
import {
  MESSAGE_TYPES,
  isMultipleOfFifteen,
  validateTimeMultFifteen,
} from '../../../utils/validate.requirements.js';
import { renderEvents, postEvent } from '../../../gateway/events.js';
import PropTypes from 'prop-types';
import moment from 'moment';
import './modal.scss';

const Modal = ({
  isVisible,
  handleCloseModal,
  setVisibility,
  events,
  setEvents,
  formData,
  setFormData,
}) => {
  const [validate, setValidate] = useState(true);

  console.log(events);

  const handleChange = event => {
    const { name, value } = event.target;

    const changedFormData = {
      ...formData,
      [name]: value,
    };
    const inputStartHour = Number(changedFormData.startTime.split(':')[0]);
    const inputStartMinutes = Number(changedFormData.startTime.split(':')[1]);
    const inputEndHour = Number(changedFormData.endTime.split(':')[0]);
    const inputEndMinutes = Number(changedFormData.endTime.split(':')[1]);
    console.log('inputFromHour ' + inputStartHour);
    console.log('inputToHour ' + inputEndHour);
    console.log('inputFromMinute ' + inputStartMinutes);
    console.log('inputToMinute ' + inputEndMinutes);

    events.forEach(event => console.log('dateFromHour ' + moment(event.dateFrom).hour()));
    events.forEach(event => console.log('dateFromMinute ' + moment(event.dateFrom).minute()));
    events.forEach(event => console.log('dateToHour ' + moment(event.dateTo).hour()));
    events.forEach(event => console.log('dateToMinute ' + moment(event.dateTo).minute()));

    if (changedFormData.startTime && changedFormData.endTime) {
      setValidate(validateTimeMultFifteen(isMultipleOfFifteen, changedFormData));
    }

    if (validateTimeMultFifteen(isMultipleOfFifteen, changedFormData)) {
      setValidate(
        !events.some(
          event =>
            inputStartHour >= moment(event.dateFrom).hour() ||
            (inputStartHour < moment(event.dateFrom).hour() &&
              inputEndHour > moment(event.dateFrom).hour() &&
              moment(event.dateFrom).minute()) < inputEndMinutes,
          // inputEndHour <= moment(event.dateTo).hour() &&
          // inputEndMinutes <= moment(event.dateTo).minute(),y
        ),
      );
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
      .catch(error => alert(error.message)); //!!!!!!!!!!!!!!!!!!!!!!!!
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
              {!validate && <ErrorMessage message={MESSAGE_TYPES.multOfFifteen} />}
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
