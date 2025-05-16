import { isValid, parseISO, format } from "date-fns";
export const stringDateToDateObject = (dateFilter) => {
  const { type, day, month, year } = dateFilter;
  const y = parseInt(year, 10);
  if (!year || year === "anyYear" || isNaN(y)) return undefined;
  let date;
  try {
    switch (type) {
      case "day":
        if (day && day !== "allDay" && month && month !== "anyMonth") {
          const m = parseInt(month, 10) - 1; // 0-indexed
          const d = parseInt(day, 10);
          if (isNaN(m) || m < 0 || m > 11 || isNaN(d)) return undefined;
          date = new Date(y, m, d);
        } else {
          return undefined;
        }
        break;
      case "month":
        if (month && month !== "anyMonth") {
          const m = parseInt(month, 10) - 1;
          if (isNaN(m) || m < 0 || m > 11) return undefined;
          date = new Date(y, m, 1);
        } else {
          date = new Date(y, 0, 1);
        }
        break; // Default Jan 1st
      case "year":
        date = new Date(y, 0, 1);
        break; // Jan 1st
      default:
        return undefined;
    }
    return isValid(date) ? date : undefined;
  } catch (e) {
    console.error("Error stringDateToDateObject:", e);
    return undefined;
  }
};
export const dateObjectToStringDate = (date, currentType) => {
  if (!date || !isValid(date)) {
    switch (currentType) {
      case "day":
        return { type: currentType, day: "", month: "", year: "" };
      case "month":
        return { type: currentType, day: "", month: "", year: "" };
      case "year":
        return { type: currentType, day: "", month: "", year: "" };
      default:
        return { type: "day", day: "", month: "", year: "" };
    }
  }
  try {
    const year = format(date, "yyyy");
    const month = format(date, "M"); // 1-12
    const day = format(date, "d"); // 1-31
    switch (currentType) {
      case "day":
        return { type: currentType, day: day, month: month, year: year };
      case "month":
        return { type: currentType, day: "", month: month, year: year };
      case "year":
        return { type: currentType, day: "", month: "", year: year };
      default:
        return { type: "day", day: "", month: "", year: year };
    }
  } catch (e) {
    console.error("Error dateObjectToStringDate:", e);
    switch (currentType) {
      case "day":
        return { type: currentType, day: "", month: "", year: "" };
      case "month":
        return { type: currentType, day: "", month: "", year: "" };
      case "year":
        return { type: currentType, day: "", month: "", year: "" };
      default:
        return { type: "day", day: "", month: "", year: "" };
    }
  }
};
