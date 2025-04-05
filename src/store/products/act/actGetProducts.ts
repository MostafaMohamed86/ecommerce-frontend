import { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import axios from "axios";

type TResponse = TProduct[];

const categoryApiMapping: Record<string, string> = {
    men: "men's clothing",
    women: "women's clothing",
    electronics: "electronics",
    jewelery: "jewelery"
}
const actGetProductsSlice = createAsyncThunk(
  "products/actGetProductsSlice",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;

    try {
        const apiPrefix = categoryApiMapping[prefix] || prefix;
        const encodedPrefix = encodeURIComponent(apiPrefix);
      const response = await axios.get<TResponse>(
        `https://fakestoreapi.com/products/category/${encodedPrefix}`,
        {
          signal,
        }
      );
      
      return response.data // action.payload
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsSlice;
