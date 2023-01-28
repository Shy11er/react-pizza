import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaSliceState, PizzaState, SearchPizzaParams, Status } from "./types";


export const fetchPizzas = createAsyncThunk<
  PizzaState[],
  SearchPizzaParams
>("pizzas/fetchPizzasStatus", async (params) => {
  const { sortBy, order, search, category, currentPage } = params;
  const { data } = await axios.get(
    `https://63c418a0a908563575316ae6.mockapi.io/items?page=${currentPage}&limit=8${category}&sortBy=${sortBy}&order=${order}${search}`
  );

  return data;
});

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
}

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaState[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<PizzaState[]>) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      }
    );

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;