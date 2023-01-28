// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import type { RootState } from "../store";

// export type CartItem = {
//   id: string;
//   title: string;
//   price: number;
//   imageUrl: string;
//   type: string;
//   size: number;
//   count: number;
// };

// interface CartSliceState {
//   totalPrice: number;
//   totalCount: number;
//   items: CartItem[];
// }

// const initialState: CartSliceState = {
//   totalPrice: 0,
//   totalCount: 0,
//   items: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addItem(state, action: PayloadAction<CartItem>) {
//       const findItem = state.items.find((obj) => obj.id === action.payload.id);
  
//       if (findItem) {
//         findItem.count++;
//       } else {
//         state.items.push({ ...action.payload, count: 1 });
//       }

//       state.totalPrice = state.items.reduce((sum, obj) => {
//         return sum + obj.price * obj.count;
//       }, 0);
//     },
//     minusItem(state, action: PayloadAction<string>) {
//       const findItem = state.items.find((obj) => obj.id === action.payload);

//       if (findItem) {
//         findItem.count--;
//       }

//       state.totalPrice = state.items.reduce((sum, obj) => {
//         return sum + obj.price * obj.count;
//       }, 0);
//     },
//     removeItem(state, action: PayloadAction<string>) {
//       if (window.confirm("Are you sure to remove this pizza?")) {
//         state.items = state.items.filter((obj) => obj.id !== action.payload);
//       }

//       state.totalPrice = state.items.reduce((sum, obj) => {
//         return sum + obj.price * obj.count;
//       }, 0);
//     },
//     clearItems(state) {
//       if (
//         state.items.length > 0 &&
//         window.confirm("Are you sure to clear the cart?")
//       ) {
//         state.items = [];
//         state.totalPrice = 0;
//       }
//     },
//   },
// });

// export const selectCart = (state: RootState) => state.cart;
// export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id)

// export const { addItem, clearItems, removeItem, minusItem } = cartSlice.actions;

// export default cartSlice.reducer;