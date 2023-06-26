import moment from 'moment';

export const transformEvents = ev => {
  return ev.reduce(
    (acc, el) => ({
      ...acc,
      [moment(el.dateFrom).date()]: acc[moment(el.dateFrom).date()]
        ? acc[moment(el.dateFrom).date()].concat(el)
        : [el],
    }),
    {},
  );
};
