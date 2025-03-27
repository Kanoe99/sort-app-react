const months = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

const monthsUpper = months.map((month) => month.toUpperCase());

const startingMonths = months.map((month) => {
  const last_letter = month.length - 1;
  month =
    month[last_letter] !== "т"
      ? month.slice(0, last_letter) + "я"
      : month + "а";
  return month;
});

export { months, startingMonths, monthsUpper };
