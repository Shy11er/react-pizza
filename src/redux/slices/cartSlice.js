import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice += Number(action.payload.price);
    },
    removeItem(state, action) {
      state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
    onIncrementCount(state, id) {
      state.items.id.count++;
    },
    onDecrementCount(state) {
      state.items.count--;
    },
  },
});

export const {
  setTotalCount,
  setTotalPrice,
  addItem,
  clearItems,
  removeItem,
  onIncrementCount,
  onDecrementCount,
} = cartSlice.actions;

export default cartSlice.reducer;
