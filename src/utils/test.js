export const getCurrentEndHour = currentStartHour => {
  // console.log(currentStartHour.format('HH:mm'));
  const nextHour = Number(currentStartHour.format('HH:mm').split(':')[0]) + 1;
  return nextHour < 10 ? `0${nextHour}:00` : `${nextHour}:00`;
};

export const getCurrentDate = (data, getCurrentEndHour) => {
  console.log(data);
  const date = data.format('YYYY-MM-DD');
  console.log(data);
  const startTime = data.format('HH:mm');
  const endTime = getCurrentEndHour(startTime);
  const testObj = {
    date,
    startTime,
    endTime,
  };
  console.log(testObj);
  return testObj;
};

export const fillSelectedModalData = (
  event,
  dayStart,
  setFormData,
  getCurrentEndHour,
  getCurrentDate,
  handelModalOpen,
) => {
  const currentHour = event.target.dataset.time;
  const currentDatePicker = moment(dayStart).set('hour', currentHour);
  console.log(currentDatePicker);
  const currentDate = getCurrentDate(currentDatePicker, getCurrentEndHour);
  console.log(currentDate);

  setFormData(prev => ({
    ...prev,
    ...currentDate,
  }));
  handelModalOpen();
};

export const fillModalData = (handelModalOpen, setFormData, getCurrentDate, getCurrentEndHour) => {
  const date = moment();
  const currentDate = getCurrentDate(date, getCurrentEndHour);
  setFormData(prev => ({
    ...prev,
    ...currentDate,
  }));
  handelModalOpen();
};
