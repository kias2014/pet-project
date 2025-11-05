import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartItem, Product} from '@types/index';

interface CartState {
  items: CartItem[];
  totalAmount: number;
  itemCount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{product: Product; quantity: number}>
    ) => {
      const existingItem = state.items.find(
        item => item.productId === action.payload.product.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          id: Date.now().toString(),
          productId: action.payload.product.id,
          product: action.payload.product,
          quantity: action.payload.quantity,
          price: action.payload.product.price,
        });
      }

      // Recalculate totals
      state.itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);

      // Recalculate totals
      state.itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{id: string; quantity: number}>
    ) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;

        // Recalculate totals
        state.itemCount = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },
    clearCart: state => {
      state.items = [];
      state.totalAmount = 0;
      state.itemCount = 0;
    },
  },
});

export const {addToCart, removeFromCart, updateQuantity, clearCart} =
  cartSlice.actions;

export default cartSlice.reducer;
