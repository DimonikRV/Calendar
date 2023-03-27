import moment from 'moment';

export const getWeekStartDate = date => {
  const dateCopy = date.clone();

  const monday = moment(dateCopy).day(1);

  return monday.format('YYYY-MM-DD');
};

export const generateWeekRange = startDate => {
  const result = [];
  for (let i = 1; i < 7; i += 1) {
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
