import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async ({ sortBy, order, category, search, currentPage }) => {
    const { data } = await axios.get(
      `https://63c418a0a908563575316ae6.mockapi.io/items?page=${currentPage}&limit=8${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | errror | success
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;  
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
