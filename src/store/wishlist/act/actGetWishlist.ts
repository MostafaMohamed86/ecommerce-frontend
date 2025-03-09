import { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import axios from "axios";
import { RootState } from "@store/index";

type TDataType = "productsFullInfo" | "productsIds";
type TResponse = TProduct[];
const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`,
        { signal }
      );
      if (!userWishlist.data.length) return {data: [], dataType: "empty"}

      if(dataType === "productsIds"){
        const concatenatedItemsId = userWishlist.data
            .map((el) => el.productId); // ids
            return {data: concatenatedItemsId, dataType: "productsIds"} // action.payload
      }else{
          const concatenatedItemsId = userWishlist.data
            .map((el) => `id=${el.productId}`) // fullData
            .join("&"); //"id=5&id=4&"
          const response = await axios.get<TResponse>(
            `/products?${concatenatedItemsId}`
          );
          return {data: response.data, dataType: "productsFullInfo"}; // action.payload
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
