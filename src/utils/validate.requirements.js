export const MESSAGE_TYPES = {
  multOfFifteen: 'choose time multiple of 15 minutes',
  overlap: 'two events cannot overlap',
  lasts: 'event can lasts within one day only',
  maxSixHour: 'event can lasts only 6 hours',
  deleteEvent: "event can't be deleted earlier than 15 minutes before begin",
};

export const isMultipleOfFifteen = time => {
  return Number(time.split(':')[1]) % 15 === 0 || time.split(':')[1] === '00';
};

export const validateTimeMultFifteen = (isMultipleOfFifteen, changedFormData) => {
  if (
    !isMultipleOfFifteen(changedFormData.startTime) ||
    !isMultipleOfFifteen(changedFormData.endTime)
  ) {
    return false;
  } else if (
    isMultipleOfFifteen(changedFormData.startTime) &&
    isMultipleOfFifteen(changedFormData.endTime)
  ) {
    return true;
  }
};
