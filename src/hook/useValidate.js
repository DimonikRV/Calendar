import moment from 'moment';

export const useValidate = (
  MESSAGE_TYPES,
  setValidate,
  setErrorStatus,
  dateSortedEvents,
  changedFormData,
  getIsMoreSixHours,
  isMultipleOfFifteen,
  validateTimeMultFifteen,
) => {
  const inputStartHour = Number(changedFormData.startTime.split(':')[0]);
  const inputEndHour = Number(changedFormData.endTime.split(':')[0]);
  const inputEndMinutes = Number(changedFormData.endTime.split(':')[1]);
  const inputDay = Number(changedFormData.date.split('-')[2]);

  const isMoreSixHours = getIsMoreSixHours(inputStartHour, inputEndHour, inputEndMinutes);

  if (inputEndHour === 0 && inputEndMinutes > 0) {
    setValidate(false);
    setErrorStatus(MESSAGE_TYPES.lasts);
  } else if (isMoreSixHours) {
    setValidate(false);
    setErrorStatus(MESSAGE_TYPES.maxSixHour);
  } else if (
    dateSortedEvents[inputDay] &&
    validateTimeMultFifteen(isMultipleOfFifteen, changedFormData)
  ) {
    setValidate(
      validateTimeMultFifteen(isMultipleOfFifteen, changedFormData) &&
        !dateSortedEvents[inputDay].some(
          event =>
            (inputStartHour <= moment(event.dateFrom).hour() &&
              inputEndHour >= moment(event.dateFrom).hour() &&
              inputEndMinutes > 0) ||
            (inputStartHour <= moment(event.dateFrom).hour() &&
              inputEndHour > moment(event.dateFrom).hour()),
        ),
    );
    setErrorStatus(MESSAGE_TYPES.overlap);
  } else {
    setValidate(validateTimeMultFifteen(isMultipleOfFifteen, changedFormData));
    setErrorStatus(MESSAGE_TYPES.multOfFifteen);
  }
};
