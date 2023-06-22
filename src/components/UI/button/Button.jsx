import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

const Button = ({ children, handleDeleteEvent, height, ...props }) => {
  return (
    <button
      {...props}
      className="delete-event-btn"
      onClick={handleDeleteEvent}
      style={{
        top: `${height}px`,
      }}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  handleDeleteEvent: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
};

export default Button;
