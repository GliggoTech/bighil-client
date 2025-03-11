export const getMonthOptions = () => {
  return [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
};

// Get year options
export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= currentYear - 5; i--) {
    years.push({ value: i.toString(), label: i.toString() });
  }
  return years;
};

// Get day options
export const getDayOptions = () => {
  const days = [];
  for (let i = 1; i <= 31; i++) {
    const day = i < 10 ? `0${i}` : `${i}`;
    days.push({ value: day, label: day });
  }
  return days;
};
