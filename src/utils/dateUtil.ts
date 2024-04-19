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
