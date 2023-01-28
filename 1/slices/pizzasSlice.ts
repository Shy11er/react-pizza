// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
// import { RootState } from "../store";

// type PizzaState = {
//   id: string;
//   title: string;
//   price: number;
//   imageUrl: string;
//   types: number[];
//   sizes: number[];
//   count: number;
// };

// interface PizzaSliceState {
//   items: PizzaState[];
//   status: "loading" | "error" | "success";
// }

// const initialState: PizzaSliceState = {
//   items: [],
//   status: "loading", // loading | errror | success
// };

// export const fetchPizzas = createAsyncThunk<
//   PizzaState[],
//   Record<string, string>
// >("pizzas/fetchPizzasStatus", async (params) => {
//   const { sortBy, order, search, category, currentPage } = params;
//   const { data } = await axios.get(
//     `https://63c418a0a908563575316ae6.mockapi.io/items?page=${currentPage}&limit=8${category}&sortBy=${sortBy}&order=${order}${search}`
//   );

//   return data;
// });

// const pizzasSlice = createSlice({
//   name: "pizzas",
//   initialState,
//   reducers: {
//     setItems(state, action: PayloadAction<PizzaState[]>) {
//       state.items = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchPizzas.pending, (state) => {
//       state.status = "loading";
//       state.items = [];
//     });

//     builder.addCase(
//       fetchPizzas.fulfilled,
//       (state, action: PayloadAction<PizzaState[]>) => {
//         state.status = "success";
//         state.items = action.payload;
//       }
//     );

//     builder.addCase(fetchPizzas.rejected, (state) => {
//       state.status = "error";
//       state.items = [];
//     });
//   },
// });

// export const { setItems } = pizzasSlice.actions;

// export const SelectPizzas = (state: RootState) => state.pizzas;

// export default pizzasSlice.reducer;