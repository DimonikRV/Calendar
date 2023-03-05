import React from 'react';
import PropTypes from 'prop-types';
import { deleteEvent, renderEvents } from '../../gateway/events';
import './event.scss';

const Event = ({ height, top, title, time, hourEvents, weekFirstEvent, setEvents, checked }) => {
  let checkedEvent;

  const handleDeleteEvent = event => {
    const dataEvent = event.target.closest('.event').dataset.event;
    const { id } = hourEvents.find(event => event.id === dataEvent);

    deleteEvent(id)
      .then(() => renderEvents(setEvents))
      .catch(error => alert(error.message));
  };

  const eventStyle = {
    height,
    top,
    cursor: 'pointer',
    zIndex: '1',
  };

  const [idEvent, value] = Object.entries(checked).reduce(
    (acc, curEvent) => acc.concat(curEvent),
    [],
  );

  if (idEvent === weekFirstEvent) {
    checkedEvent = value;
  }

  return (
    <div className="event" style={eventStyle} data-event={weekFirstEvent}>
      <div className="event-body">
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
      {checkedEvent && (
        <button
          className="delete-event-btn"
          onClick={handleDeleteEvent}
          style={{
            position: 'absolute',
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
    </div>
  );
};
Event.propTypes = {
  hourEvents: PropTypes.array,
  weekFirstEvent: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  setEvents: PropTypes.func.isRequired,
  checked: PropTypes.object.isRequired,
};
Event.defaultProps = {
  hourEvents: null,
};
export default Event;
