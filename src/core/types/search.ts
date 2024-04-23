type SelectType<T> = {
  disabled?: boolean;
  label: T;
  value: T;
};

export type SearchOptionLabel = '내용' | '장르' | '제목' | '카테고리';
export type SearchOptionType = SelectType<SearchOptionLabel>;

export type OperationLabel = '그리고' | '또는';
export type OperationType = SelectType<OperationLabel>;

export type GenreLabel =
  | 'MYSTERY'
  | 'SF'
  | 'TV 영화'
  | '가족'
  | '공포'
  | '다큐멘터리'
  | '드라마'
  | '로맨스'
  | '모험'
  | '범죄'
  | '서부'
  | '스릴러'
  | '애니메이션'
  | '액션'
  | '역사'
  | '음악'
  | '전쟁'
  | '코미디'
  | '판타지';

export type GenreLabelEng =
  | 'ACTION'
  | 'ADVENTURE'
  | 'ANIMATION'
  | 'COMEDY'
  | 'CRIME'
  | 'DOCUMENTARY'
  | 'DRAMA'
  | 'FAMILY'
  | 'FANTASY'
  | 'HISTORY'
  | 'HORROR'
  | 'MUSIC'
  | 'MYSTERY'
  | 'ROMANCE'
  | 'SCIENCE_FICTION'
  | 'THRILLER'
  | 'TV_MOVIE'
  | 'WAR'
  | 'WESTERN';

export type GenreType = SelectType<GenreLabel>;
