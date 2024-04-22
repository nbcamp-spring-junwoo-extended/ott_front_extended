import dayjs from 'dayjs';

import { DateArray } from '../core/types/common.ts';

export const dateArrayToString = (dateArray: DateArray): string => {
  if (!dateArray) return '';

  const [year, month, day, ...others] = dateArray;
  const date = new Date(year, month - 1, day, ...others);

  return date.toLocaleDateString('ko-KR', {
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

export const calculateEndDate = (): string => {
  const endDate = dayjs('2024-05-2');
  const now = dayjs();

  if (endDate.isBefore(now)) {
    return ' 상폐 -완-';
  }
  return ` 상폐 ${endDate.diff(now, 'days').toString()}일 전`;
};
