import { immer } from "zustand/middleware/immer";
import { create } from "zustand/react";

import { ICartItem } from "./Cart.types.ts";

export interface ICartStore_Cart extends ICartItem {
  count: number;
}

interface State {
  cart: { [key: number]: ICartStore_Cart };
  allPrice: number;
}

interface Actions {
  addToCart: (item: ICartItem) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;

  calculateAllPrice: () => void;
}

const useCartStore = create<State & Actions>()(
  immer((set) => ({
    cart: {},
    allPrice: 0,
    addToCart: (item: ICartItem) => {
      set((store) => {
        const cartItem = store.cart[item.id];

        if (cartItem === undefined) {
          store.cart[item.id] = { ...item, count: 1 };
        } else {
          store.cart[item.id] = { ...cartItem, count: cartItem.count + 1 };
        }
      });
    },
    removeFromCart: (itemId: number) => {
      set((store) => {
        const cartItem = store.cart[itemId];

        if (cartItem === undefined) {
          console.log("already deleted");
        } else {
          if (cartItem.count - 1 > 0) {
            store.cart[itemId] = { ...cartItem, count: cartItem.count - 1 };
          } else {
            delete store.cart[itemId];
          }
        }
      });
    },
    clearCart: () => {
      set((store) => {
        store.cart = {};
      });
    },
    calculateAllPrice: () => {
      set((store) => {
        let price = 0;
        Object.keys(store.cart).forEach((itemId) => {
          const item = store.cart[Number(itemId)]!;
          price += item.price * item.count;
        });
        store.allPrice = price;
      });
    },
  })),
);

export { useCartStore };
