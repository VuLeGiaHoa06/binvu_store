import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartItem = {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
};

export type CartStore = {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (idToRemove: string) => void;
  increaseQuantity: (idToIncrease: string) => void;
  decreaseQuantity: (idToDecrease: string) => void;
  clearItems: () => void;
};

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;

        const currentItems = get().cartItems;

        console.log(currentItems);

        const isExisting = currentItems.find(
          (currentItem) => currentItem.item._id === item._id
        );

        if (isExisting) {
          toast("Item already in cart", { icon: "🛒" });
          return;
        }

        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast.success("Item is added in cart", { icon: "😁" });
      },
      removeItem: (idToRemove: string) => {
        const currentItems = get().cartItems;

        const newCartItems = currentItems.filter(
          (currentItem) => currentItem.item._id !== idToRemove
        );

        set({ cartItems: newCartItems });
        toast.success("Item is deleted in cart", { icon: "😁" });
      },
      increaseQuantity: (idToIncrease: string) => {
        const currentItems = get().cartItems;

        const newCartItems = currentItems.map((currentItem) => {
          if (currentItem.item._id === idToIncrease) {
            return { ...currentItem, quantity: currentItem.quantity + 1 };
          } else {
            return currentItem;
          }
        });

        set({ cartItems: newCartItems });
      },
      decreaseQuantity: (idToDecrease: string) => {
        const currentItems = get().cartItems;

        const newCartItems = currentItems.map((currentItem) => {
          if (currentItem.item._id === idToDecrease) {
            return { ...currentItem, quantity: currentItem.quantity - 1 };
          } else {
            return currentItem;
          }
        });

        set({ cartItems: newCartItems });
      },
      clearItems: () => {
        set({ cartItems: [] });
      },
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
