import React from 'react';
import PropTypes from 'prop-types';
import { deleteEvent, renderEvents } from '../../gateway/events';
import Button from '../button/Button';
import './event.scss';

const Event = ({ height, top, title, time, setEvents, eventChecked, id }) => {
  const handleDeleteEvent = () => {
    deleteEvent(id)
      .then(() => renderEvents(setEvents))
      .catch(error => alert(error.message));
  };

  const eventStyle = {
    height,
    top,
    cursor: 'pointer',
    zIndex: '1',
    position: 'relative',
  };

  const toggleChecked = (eventChecked, id) => {
    let checked;
    if (!eventChecked) {
      return false;
    }
    const [idEvent, value] = Object.entries(eventChecked).reduce(
      (acc, curEvent) => acc.concat(curEvent),
      [],
    );
    if (idEvent === id) {
      checked = value;
    }
    return checked;
  };

  const checkedEvent = toggleChecked(eventChecked, id);

  return (
    <>
      <div className="event" style={eventStyle} data-event={id}>
        <div className="event-body">
          <div className="event__title">{title}</div>
          <div className="event__time">{time}</div>
        </div>
      </div>
      {checkedEvent && (
        <Button type="button" handleDeleteEvent={handleDeleteEvent} height={height - 5}>
          <i className="fa fa-trash" aria-hidden="true"></i>
          <span className="delete-event-btn__name">Delete</span>
        </Button>
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
  eventChecked: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default Event;
