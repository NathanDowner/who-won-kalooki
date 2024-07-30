export const formatName = (name: string) => {
  const nameParts = name.split(' ');
  if (nameParts.length === 2) {
    return nameParts[0];
  }
  return name;
};

export const formatRound = (round: string) => {
  return round.split('').join('-');
};

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);

// write me a function that converts a string to sentence case
export const toSentenceCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
