export const MESSAGE_TYPES = {
  multOfFifteen: 'Choose time multiple of 15 minutes',
  overlap: "Events can't overlap",
  lasts: 'Event can lasts within one day only',
  maxSixHour: 'Event can lasts only 6 hours',
  deleteEvent: "Event can't be deleted earlier than 15 minutes before begin",
};

export const isMultipleOfFifteen = time => {
  return Number(time.split(':')[1]) % 15 === 0 || time.split(':')[1] === '00';
};

export const getIsMoreSixHours = (inputStartHour, inputEndHour, inputEndMinutes) => {
  return (
    (inputEndHour - inputStartHour === 6 && inputEndMinutes > 0) ||
    inputEndHour - inputStartHour > 6
  );
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
