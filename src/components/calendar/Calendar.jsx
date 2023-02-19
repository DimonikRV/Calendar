import React, { useState, useEffect } from "react";
import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import Modal from "../modal/Modal";
import { getEvents } from "../../gateway/events";
import "./calendar.scss";

const Calendar = ({
  weekDates,
  isVisible,
  handleCloseModal,
  setVisibility,
}) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week weekDates={weekDates} events={events} />
        </div>
        <Modal
          isVisible={isVisible}
          handleCloseModal={handleCloseModal}
          setEvents={setEvents}
          setVisibility={setVisibility}
        />
      </div>
    </section>
  );
};

export default Calendar;
