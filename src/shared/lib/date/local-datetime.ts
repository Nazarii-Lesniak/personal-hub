import { format, isValid, parse } from "date-fns";

const DATE_INPUT_FORMAT = "yyyy-MM-dd";
const TIME_INPUT_FORMAT = "HH:mm";

export function toDateInputValue(date: Date) {
  return format(date, DATE_INPUT_FORMAT);
}

export function toTimeInputValue(date: Date) {
  return format(date, TIME_INPUT_FORMAT);
}

export function localDateTimeToISOString(date: string, time: string) {
  const value = parse(
    `${date} ${time}`,
    `${DATE_INPUT_FORMAT} ${TIME_INPUT_FORMAT}`,
    new Date(),
  );

  return isValid(value) ? value.toISOString() : "";
}
