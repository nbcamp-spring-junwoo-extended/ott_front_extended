import { AxiosResponse } from 'axios';

export type DateArray = [number, number, number, number, number, number, number] | [number, number, number];

type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type Pageable = {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
  unpaged: boolean;
};

export type Page<T> = {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
};

export type ApiResponse<T> = Promise<
  AxiosResponse<{
    data: T;
  }>
>;
