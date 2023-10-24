const SECOND_IN_MILLIS = 1000;
const MINUTE_IN_MILLIS = SECOND_IN_MILLIS * 60;
const HOUR_IN_MILLIS = MINUTE_IN_MILLIS * 60;
const DAY_IN_MILLIS = HOUR_IN_MILLIS * 24;

const getTextForCardinality = (
  count: number,
  unit: string,
  pluralUnit?: string
) => {
  if (count === 1) {
    return `1 ${unit}`;
  }
  return `${count} ${pluralUnit ?? `${unit}s`}`;
};

export const getFormattedTimeSince = (date: Date): string => {
  const now = Date.now();
  const diff = now - date.getTime(); // in millis;

  const seconds = (diff % MINUTE_IN_MILLIS) / SECOND_IN_MILLIS;
  const secondsText = getTextForCardinality(Math.round(seconds), "second");
  if (diff < MINUTE_IN_MILLIS) {
    // time was a matter of seconds ago
    if (seconds < 10) {
      return "just a few seconds ago";
    }

    return `${secondsText} ago`;
  }

  const minutes = (diff % HOUR_IN_MILLIS) / MINUTE_IN_MILLIS;
  const minutesText = getTextForCardinality(Math.round(minutes), "minute");
  if (diff < HOUR_IN_MILLIS) {
    if (seconds === 0) {
      return minutesText;
    }
    return `${minutesText}, ${secondsText} ago`;
  }

  const hours = (diff % DAY_IN_MILLIS) / HOUR_IN_MILLIS;
  const hoursText = getTextForCardinality(Math.round(hours), "hour");
  if (diff < DAY_IN_MILLIS) {
    if (minutes === 0) {
      return hoursText;
    }
    return `${hoursText}, ${minutesText} ago`;
  }

  const days = diff / DAY_IN_MILLIS;
  const daysText = getTextForCardinality(Math.round(days), "day");
  if (hours === 0) {
    return daysText;
  }
  return `${daysText}, ${hoursText} ago`;
};
