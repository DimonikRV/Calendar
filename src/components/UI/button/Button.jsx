import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './button.scss';

const Button = ({ children, height, buttonColor, button_margin, ...props }) => {
  const buttonBackground = classNames(
    'button',
    { button_red: buttonColor },
    { button_margin: button_margin },
  );
  return (
    <button {...props} className={buttonBackground}>
      {children}
    </button>
  );
};

Button.propTypes = {
  handleDeleteEvent: PropTypes.func,
  height: PropTypes.number,
};

export default Button;
