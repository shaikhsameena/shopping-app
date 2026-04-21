import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage if available
const savedWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: savedWishlist,
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.products.find((item) => item.id === product.id);
      if (!exists) {
        state.products.push(product);
        localStorage.setItem("wishlistItems", JSON.stringify(state.products));
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((item) => item.id !== productId);
      localStorage.setItem("wishlistItems", JSON.stringify(state.products));
    },
    clearWishlist: (state) => {
      state.products = [];
      localStorage.removeItem("wishlistItems");
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
