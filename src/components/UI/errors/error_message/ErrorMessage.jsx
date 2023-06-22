import React from 'react';
import './error_message.scss';

const ErrorMessage = ({ message }) => {
  return <p className="valid-error form-time-error">{message}</p>;
};
export default ErrorMessage;
