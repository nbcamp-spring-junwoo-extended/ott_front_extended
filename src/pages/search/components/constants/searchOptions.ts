import { GenreType, OperationType, SearchOptionType } from '../../../../core/types/search.ts';

export const searchOptions: SearchOptionType[] = [
  { label: '제목', value: '제목' },
  { label: '내용', value: '내용' },
  { label: '장르', value: '장르' },
];

export const operationOptions: OperationType[] = [
  { label: '또는', value: '또는' },
  { label: '그리고', value: '그리고' },
];

export const genreOptions: GenreType[] = [
  { label: 'MYSTERY', value: 'MYSTERY' },
  { label: 'SF', value: 'SF' },
  { label: 'TV 영화', value: 'TV 영화' },
  { label: '가족', value: '가족' },
  { label: '공포', value: '공포' },
  { label: '다큐멘터리', value: '다큐멘터리' },
  { label: '드라마', value: '드라마' },
  { label: '로맨스', value: '로맨스' },
  { label: '모험', value: '모험' },
  { label: '범죄', value: '범죄' },
  { label: '서부', value: '서부' },
  { label: '스릴러', value: '스릴러' },
  { label: '애니메이션', value: '애니메이션' },
  { label: '액션', value: '액션' },
  { label: '역사', value: '역사' },
  { label: '음악', value: '음악' },
  { label: '전쟁', value: '전쟁' },
  { label: '코미디', value: '코미디' },
  { label: '판타지', value: '판타지' },
];
