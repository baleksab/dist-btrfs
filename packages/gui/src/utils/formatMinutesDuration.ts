export const formatMinutesDuration = (minutesTotal: number, intl: string) => {
  if (minutesTotal < 0 || !Number.isFinite(minutesTotal)) return "";

  const days = Math.floor(minutesTotal / (60 * 24));
  const hours = Math.floor((minutesTotal % (60 * 24)) / 60);
  const minutes = Math.floor(minutesTotal % 60);

  const df = new Intl.DurationFormat(intl, {
    style: "long",
    format: ["days", "hours", "minutes"]
  });

  return df.format({ days, hours, minutes });
};
