import dayjs from 'dayjs';

import { DateArray } from '../core/types/common.ts';

export const dateArrayToString = (dateArray: DateArray): string => {
  if (!dateArray) return '';

  let date;
  if (dateArray.length === 3) {
    const [year, month, day] = dateArray;
    date = new Date(year, month - 1, day);
    return date.toLocaleDateString();
  }
  const [year, month, day, hour, minute, second, ms] = dateArray;
  date = new Date(year, month - 1, day, hour, minute, second, ms);

  return date.toLocaleTimeString('ko-KR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const dateArrayToDayjs = (dateArray: DateArray): dayjs.Dayjs => {
  if (!dateArray) return dayjs();

  const [year, month, day, ...others] = dateArray;
  return dayjs(new Date(year, month - 1, day, ...others));
};

export const calculateCommerceDate = (): string => {
  const endDate = dayjs('2024-05-2');
  const now = dayjs();

  if (endDate.isBefore(now)) {
    return ' 상폐 -완-';
  }
  return ` 상폐 ${endDate.diff(now, 'days').toString()}일 전`;
};

export const calculateRemainingDays = (dateArray: DateArray): string => {
  const expireAt = dateArrayToDayjs(dateArray).add(1, 'day');
  const now = dayjs();

  if (expireAt.isBefore(now)) {
    return '만료';
  }

  return `${expireAt.diff(now, 'days').toString()}일 남음`;
};
