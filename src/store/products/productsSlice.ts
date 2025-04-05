import { isString, TLoading, TProduct } from "@types";
import { createSlice } from "@reduxjs/toolkit";
import actGetProductsSlice from "./act/actGetProducts";
import actGetAllProducts from "./act/actGetAllProducts";

interface IProductSlice {
  records: TProduct[];
  allProducts: TProduct[];
  loading: TLoading;
  error: string | null;
}
const initialState: IProductSlice = {
  records: [],
  allProducts: [],
  loading: "idle",
  error: null,
};
const productsSlice = createSlice({
  initialState,
  name: "products",
  reducers: {
    cleanUpProductsRecords: (state) => {
      state.records = [];
    },
    cleanUpAllProducts: (state) => {
      state.allProducts = [];
    },
  },
  extraReducers: (builder) => {
    // get products by cat_prefix
    builder.addCase(actGetProductsSlice.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsSlice.fulfilled, (state, action) => {
      state.records = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(actGetProductsSlice.rejected, (state, action) => {
      if (isString(action.payload)) state.error = action.payload; // or action.payload as string (without doing the if condition)
      state.loading = "failed";
    });
    // get all products
    builder.addCase(actGetAllProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetAllProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(actGetAllProducts.rejected, (state, action) => {
      if (isString(action.payload)) state.error = action.payload; // or action.payload as string (without doing the if condition)
      state.loading = "failed";
    });
  },
});

export const { cleanUpProductsRecords, cleanUpAllProducts } =
  productsSlice.actions;
export { actGetProductsSlice, actGetAllProducts };
export default productsSlice.reducer;
