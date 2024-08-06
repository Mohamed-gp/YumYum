import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products") as string)
      : [],
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
      localStorage.setItem("products", JSON.stringify(state.products));
    },
  },
});

const productsActions = productsSlice.actions;
export default productsSlice.reducer;

export { productsActions };
