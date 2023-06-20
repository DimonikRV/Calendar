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
