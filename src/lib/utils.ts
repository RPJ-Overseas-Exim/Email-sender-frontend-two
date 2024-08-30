import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGMTTime(hours: string, minutes: string) {
  const currDate = new Date();
  currDate.setHours(Number(hours));
  currDate.setMinutes(Number(minutes));

  //get the minutes and hours in UTC
  return {
    minutes: String(currDate.getUTCMinutes()),
    hours: String(currDate.getUTCHours()),
  };
}

export function getISTTime(hours: string, minutes: string) {
  const currDate = new Date();
  // year, month, day, hour, minute
  const currDateLocale = new Date(
    Date.UTC(
      currDate.getUTCFullYear(),
      currDate.getUTCMonth(),
      currDate.getUTCDate(),
      Number(hours),
      Number(minutes),
    ),
  );

  //get the minutes and hours in UTC
  return {
    minutes: String(currDateLocale.getMinutes()),
    hours: String(currDateLocale.getHours()),
  };
}
