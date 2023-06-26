import React, { useState } from 'react';
import DeleteEventButton from '../UI/delete_button/DeleteEventButton';
import PropTypes from 'prop-types';
import { deleteEvent, renderEvents } from '../../gateway/events';
import './event.scss';

const Event = ({ height, top, title, time, setEvents, id }) => {
  const [eventChecked, setEventChecked] = useState(false);

  const eventStyle = {
    height,
    top,
    cursor: 'pointer',
    zIndex: '1',
    position: 'relative',
  };
  const handleDelButtonDisappear = event => {
    event.stopPropagation();
    setEventChecked(false);
  };

  const handleDeleteEvent = event => {
    event.stopPropagation();
    deleteEvent(id)
      .then(() => setEventChecked(false))
      .then(() => renderEvents(setEvents))
      .catch(error => alert(error.message));
  };

  return (
    <>
      <div
        className="event"
        style={eventStyle}
        data-event={id}
        onClick={event => {
          event.stopPropagation();
          setEventChecked(true);
        }}
      >
        <div className="event-body">
          <div className="event__title">{title}</div>
          <div className="event__time">{time}</div>
        </div>
      </div>
      {eventChecked && (
        <DeleteEventButton
          height={height}
          handleDeleteEvent={handleDeleteEvent}
          handleDelButtonDisappear={handleDelButtonDisappear}
        />
      )}
    </>
  );
};
Event.propTypes = {
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  setEvents: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Event;
