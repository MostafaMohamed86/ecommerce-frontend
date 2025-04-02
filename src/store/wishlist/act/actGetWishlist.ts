import { TProduct } from "@types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import axios from "axios";
import { RootState } from "@store/index";

type TDataType = "productsFullInfo" | "productsIds";

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `https://67cf29c0823da0212a81ac7f.mockapi.io/wishlist?userId=${auth.user?.id}`,
        { signal }
      );

      if (!userWishlist.data.length) return { data: [], dataType: "empty" };

      if (dataType === "productsIds") {
        const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
        return { data: concatenatedItemsId, dataType: "productsIds" };
      } else {
        const productPromises = userWishlist.data.map((el) =>
          axios.get<TProduct>(
            `https://fakestoreapi.com/products/${el.productId}`
          )
        );

        const responses = await Promise.all(productPromises);
        const fullProducts = responses.map((response) => response.data);
        return { data: fullProducts, dataType: "productsFullInfo" };
      }
    } catch (error) {
      // ✅ التأكد إذا كان الخطأ 404، نرجّع [] بدل ما نعتبرها Error
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return { data: [], dataType: "empty" };
      }
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);


export default actGetWishlist;
