import { TLoading, TProduct, isString } from "@types";
import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { getCartTotalQuantitySelector } from "./selectors";

interface ICartState {
  items: { [key: string]: number };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
}
const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};
const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart: (state, action) => {
      // (state) selector   (action) dispatch
      const id = action.payload;
      if (state.items[id]) state.items[id]++;
      else state.items[id] = 1;
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
      const id = action.payload;
      delete state.items[id]; // remove from items {}
      state.productsFullInfo = state.productsFullInfo.filter(
        (product) => product.id !== id
      );
    },
    cleanCartProductsFullInfo: (state) => {
      state.productsFullInfo = [];
    },
    clearCartAfterPlaceOrder: (state) => {
      state.items = {};
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.productsFullInfo = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      if (isString(action.payload)) state.error = action.payload;
      state.loading = "failed";
    });
  },
});

export { getCartTotalQuantitySelector, actGetProductsByItems };
export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
  clearCartAfterPlaceOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
