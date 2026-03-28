export const calculateGapPercentage = (required, actual) => {
  const gap = required - actual;

  if (gap <= 0) return 0;

  return (gap / required) * 100;
};
