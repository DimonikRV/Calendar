import moment from 'moment';

export const getWeekStartDate = date => {
  const dateCopy = date.clone();

  const monday = moment(dateCopy).startOf('week');

  return monday.format('YYYY-MM-DD');
};

export const generateWeekRange = startDate => {
  const result = [];
  for (let i = 1; i <= 7; i += 1) {
    const base = moment(startDate).clone();
    result.push(base.day(i).format());
  }
  return result;
};

export const getCurrentMonths = (generateWeekDates, months) => {
  return generateWeekDates()
    .map(date => `${months[moment(date).month()].slice(0, 3)}  ${moment(date).year()}`)
    .filter((item, index, arr) => index === arr.indexOf(item))
    .join(' - ');
};

export const getDateFromEvent = (dateValue, timeValue) => {
  return moment(`${dateValue}/${timeValue}`).format();
};
export const hours = Array(24)
  .fill()
  .map((val, index) => index);

export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const getCurrentEndHour = currentStartHour => {
  const nextHour = Number(currentStartHour.split(':')[0]) + 1;
  return nextHour < 10
    ? `0${nextHour}:${currentStartHour.split(':')[1]}`
    : `${nextHour}:${currentStartHour.split(':')[1]}`;
};

export const getCurrentDate = (data, getCurrentEndHour) => {
  const date = data.format('YYYY-MM-DD');
  const startTime = data.format('HH:mm');
  const endTime = getCurrentEndHour(startTime);

  return {
    date,
    startTime,
    endTime,
  };
};

export const fillModalData = ({
  event,
  dayStart,
  setFormData,
  getCurrentEndHour,
  handelModalOpen,
  getCurrentDate,
}) => {
  let date;
  if (dayStart) {
    const currentHour = event.target.dataset.time;
    date = moment(dayStart).set('hour', currentHour);
  } else {
    date = moment();
  }
  const currentDate = getCurrentDate(date, getCurrentEndHour);
  setFormData(prev => ({
    ...prev,
    ...currentDate,
  }));
  handelModalOpen();
};
