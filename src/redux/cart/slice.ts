import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getItemLS } from "../../utils/getItemLS";
import { CartSliceState, CartItem } from "./type";

const { items, totalPrice } = getItemLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
  
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      if (window.confirm("Are you sure to remove this pizza?")) {
        state.items = state.items.filter((obj) => obj.id !== action.payload);
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      if (
        state.items.length > 0 &&
        window.confirm("Are you sure to clear the cart?")
      ) {
        state.items = [];
        state.totalPrice = 0;
      }
    },
  },
});


export const { addItem, clearItems, removeItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;