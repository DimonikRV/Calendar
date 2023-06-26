import React from 'react';
import './delete_event_button.scss';

const DeleteEventButton = ({ height, handleDeleteEvent, handleDelButtonDisappear }) => {
  return (
    <button className="delete-event-btn" type="button" height={height - 5}>
      <div className="delete-event-btn__name" onClick={handleDeleteEvent}>
        <i className="fa fa-trash" aria-hidden="true"></i>
        Delete
      </div>
      <div className="delete-event-btn__cancel" onClick={handleDelButtonDisappear}>
        Cancel
        <span className="cancel">+</span>
      </div>
    </button>
  );
};
export default DeleteEventButton;
