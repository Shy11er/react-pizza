export enum sortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
}

export type SortInfo = {
  name: string;
  sortProperty: sortPropertyEnum;
};

export type FilterSliceState = {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: SortInfo;
};
