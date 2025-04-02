import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
import { TProduct } from "@types";
import { axiosErrorHandler } from "@utils";

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemIds = Object.keys(cart.items); // ["1", "2", "3", "6", "8"]

    if (!itemIds.length) {
      return fulfillWithValue([]);
    }

    try {
      const requests = itemIds.map((id) =>
        axios.get<TProduct>(`https://fakestoreapi.com/products/${id}`, {
          signal,
        })
      );

      const responses = await Promise.all(requests);

      const products = responses.map((response) => response.data);

      return products; // action.payload in fulfilled case
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByItems;
