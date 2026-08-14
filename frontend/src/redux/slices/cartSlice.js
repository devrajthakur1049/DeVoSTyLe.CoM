import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
  total: 0,
  coupon: null,
  couponDiscount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.product === action.payload.product);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      cartSlice.caseReducers.calculateTotal(state);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.product !== action.payload);
      cartSlice.caseReducers.calculateTotal(state);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.product === action.payload.product);
      if (item) {
        item.quantity = action.payload.quantity;
        cartSlice.caseReducers.calculateTotal(state);
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.coupon = null;
      state.couponDiscount = 0;
      localStorage.removeItem('cart');
    },
    applyCoupon: (state, action) => {
      state.coupon = action.payload.code;
      state.couponDiscount = action.payload.discount;
      cartSlice.caseReducers.calculateTotal(state);
    },
    removeCoupon: (state) => {
      state.coupon = null;
      state.couponDiscount = 0;
      cartSlice.caseReducers.calculateTotal(state);
    },
    calculateTotal: (state) => {
      const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const discount = subtotal * (state.couponDiscount / 100);
      state.total = subtotal - discount;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
