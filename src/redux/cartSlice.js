import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if available
const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: savedCart,
  },
  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload;
      const existingProduct = state.products.find(
        (item) => item.id === newProduct.id
      );
      if (existingProduct) {
        // Update quantity if product already exists
        existingProduct.quantity += newProduct.quantity;
      } else {
        // Add new product with quantity
        state.products.push({
          ...newProduct,
          quantity: newProduct.quantity || 1,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.products));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex(
        (item) => item.id === productId
      );
      if (productIndex !== -1) {
        if (state.products[productIndex].quantity > 1) {
          // Decrease quantity by 1
          state.products[productIndex].quantity -= 1;
        } else {
          // Remove the product entirely
          state.products.splice(productIndex, 1);
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.products));
    },
    clearCart: (state) => {
      state.products = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
