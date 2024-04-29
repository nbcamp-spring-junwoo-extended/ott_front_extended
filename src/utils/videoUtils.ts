import { GenreLabel, GenreLabelEng } from '../core/types/search.ts';

const genreToEngMap: Record<GenreLabel, GenreLabelEng> = {
  MYSTERY: 'MYSTERY',
  SF: 'SCIENCE_FICTION',
  'TV 영화': 'TV_MOVIE',
  가족: 'FAMILY',
  공포: 'HORROR',
  다큐멘터리: 'DOCUMENTARY',
  드라마: 'DRAMA',
  로맨스: 'ROMANCE',
  모험: 'ADVENTURE',
  범죄: 'CRIME',
  서부: 'WESTERN',
  스릴러: 'THRILLER',
  애니메이션: 'ANIMATION',
  액션: 'ACTION',
  역사: 'HISTORY',
  음악: 'MUSIC',
  전쟁: 'WAR',
  코미디: 'COMEDY',
  판타지: 'FANTASY',
};

export const genreToEng = (kor: GenreLabel): GenreLabelEng => {
  return genreToEngMap[kor];
};

export const genreToKor = (eng: GenreLabelEng): GenreLabel => {
  return Object.keys(genreToEngMap).find((key) => genreToEngMap[key as GenreLabel] === eng) as GenreLabel;
};
