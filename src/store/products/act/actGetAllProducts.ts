import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actGetAllProducts = createAsyncThunk(
  "getAllProducts/actGetAllPoducts",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get("https://fakestoreapi.com/products?limit=3", {
        signal,
      });
      return response.data;
    } catch (error) {
      return axiosErrorHandler(rejectWithValue(error));
    }
  }
);

export default actGetAllProducts;
