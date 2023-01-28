import { RootState } from "../store";

export const SelectFilter = (state: RootState) => state.filter;
export const SelectSort = (state: RootState) => state.filter.sort;
