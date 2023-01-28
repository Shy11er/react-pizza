import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, SortInfo, sortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  categoryId: 0,
  searchValue: "",
  currentPage: 1,
  sort: {
    name: "popularity (Desceding)",
    sortProperty: sortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortInfo>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.categoryId = Number(action.payload.categoryId);
        state.currentPage = Number(action.payload.currentPage);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: "popularity (Desceding)",
          sortProperty: sortPropertyEnum.RATING_DESC,
        };
      }
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
