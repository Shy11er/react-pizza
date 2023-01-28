import { CartItem } from "../redux/cart/type";

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => sum + obj.price * obj.count, 0);
};
