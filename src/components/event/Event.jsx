import React from 'react';
import PropTypes from 'prop-types';
import { deleteEvent, renderEvents } from '../../gateway/events';
import './event.scss';

const Event = ({ height, top, title, time, setEvents, eventChecked, id }) => {
  let checkedEvent;

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

  const [idEvent, value] = Object.entries(eventChecked).reduce(
    (acc, curEvent) => acc.concat(curEvent),
    [],
  );

  if (idEvent === id) {
    checkedEvent = value;
  }

  return (
    <>
      <div className="event" style={eventStyle} data-event={id}>
        <div className="event-body">
          <div className="event__title">{title}</div>
          <div className="event__time">{time}</div>
        </div>
      </div>
      {checkedEvent && (
        <button
          className="delete-event-btn"
          onClick={handleDeleteEvent}
          style={{
            position: 'absolute',
            zIndex: '50',
            top: `${height - 5}px`,
            zIndex: `5`,
            left: '50%',
            display: 'flex',
            alignItems: 'center',
            padding: `10px 20px`,
            width: '200px',
            height: '50px',
            color: 'black',
            borderRadius: '8px',
            cursor: 'pointer',
            border: 'none',
            transition: 'all .1s ease',
          }}
        >
          <i
            className="fa fa-trash"
            aria-hidden="true"
            style={{
              marginRight: '40px',
            }}
          ></i>
          <span className="delete-event-btn__name">Delete</span>
        </button>
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
