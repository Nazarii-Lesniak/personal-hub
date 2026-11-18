import { format, parse } from "date-fns";

const MONTH_PARAM_FORMAT = "yyyy-MM";

export function formatMonthParam(date: Date) {
  return format(date, MONTH_PARAM_FORMAT);
}

export function parseMonthParam(value: string) {
  return parse(value, MONTH_PARAM_FORMAT, new Date());
}
