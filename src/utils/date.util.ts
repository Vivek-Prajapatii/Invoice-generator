export const getNext7Days = (dateString: string) => {
  const daysInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  // Parse the input date string to create a Date object
  const currentDate = new Date(dateString);

  // Calculate the date of the 7th day
  const seventhDayDate = new Date(
    currentDate.getTime() + 7 * daysInMilliseconds
  );

  // Format the result in MM/DD/YYYY
  const formattedDate = `${
    seventhDayDate.getMonth() + 1
  }/${seventhDayDate.getDate()}/${seventhDayDate.getFullYear()}`;

  return formattedDate;
};
