import React from 'react';
import { hours } from '../../utils/dateUtils';
import './sidebar.scss';

const Sidebar = () => {
  return (
    <div className="calendar__time-scale">
      {hours.map(hour => (
        <div className="time-slot" key={hour}>
          <span className="time-slot__time">{`${hour}:00`}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
