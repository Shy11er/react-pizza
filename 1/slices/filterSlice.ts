// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";



// const initialState: FilterSliceState = {
//   categoryId: 0,
//   searchValue: "",
//   currentPage: 1,
//   sort: {
//     name: "popularity (Desceding)",
//     sortProperty: "rating",
//   },
// };

// const filterSlice = createSlice({
//   name: "filter",
//   initialState,
//   reducers: {
//     setCategoryId(state, action: PayloadAction<number>) {
//       state.categoryId = action.payload;
//     },
//     setSearchValue(state, action: PayloadAction<string>) {
//       state.searchValue = action.payload;
//     },
//     setSort(state, action: PayloadAction<Sort>) {
//       state.sort = action.payload;
//     },
//     setCurrentPage(state, action: PayloadAction<number>) {
//       state.currentPage = action.payload;
//     },
//     setFilters(state, action: PayloadAction<FilterSliceState>) {
//       if (Object.keys(action.payload).length) {
//         state.categoryId = Number(action.payload.categoryId);
//         state.currentPage = Number(action.payload.currentPage);
//         state.sort = action.payload.sort;
//       } else {
//         state.currentPage = 1;
//         state.categoryId = 0;
//         state.sort = {
//           name: "popularity (Desceding)",
//           sortProperty: "rating",
//         };
//       }
//     },
//   },
// });

// export const {
//   setCategoryId,
//   setSort,
//   setCurrentPage,
//   setFilters,
//   setSearchValue,
// } = filterSlice.actions;

// export const SelectCategoryId = (state: RootState) => state.filter.categoryId;
// export const SelectSort = (state: RootState) => state.filter.sort;
// export const SelectInitialState = (state: RootState) => state.filter;

// export default filterSlice.reducer;