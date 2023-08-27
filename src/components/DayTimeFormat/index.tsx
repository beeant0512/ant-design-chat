import dayjs from 'dayjs';

const DayTimeFormat = ({ dayTime }: { dayTime: string }) => {
  const dayTimeObject = dayjs(dayTime);
  if (dayTimeObject.isBefore(dayjs(), 'day')) {
    return dayTime;
  }
  return dayjs(dayTime).fromNow();
};

export default DayTimeFormat;
