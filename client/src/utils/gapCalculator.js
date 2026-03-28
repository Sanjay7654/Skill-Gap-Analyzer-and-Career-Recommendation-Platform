export const calculateGap = (required, user) => {
return required - user;
};

export const gapPercentage = (totalRequired, totalUser) => {
return ((totalRequired - totalUser) / totalRequired) * 100;
};