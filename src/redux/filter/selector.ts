import { RootState } from "../store";

export const SelectCategoryId = (state: RootState) => state.filter.categoryId;
export const SelectSort = (state: RootState) => state.filter.sort;
export const SelectInitialState = (state: RootState) => state.filter;
