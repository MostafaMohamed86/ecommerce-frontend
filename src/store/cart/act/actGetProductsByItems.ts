import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
import { TProduct } from '@types';
import {axiosErrorHandler} from "@utils";
type TResponse = TProduct[];


 const actGetProductsByItems = createAsyncThunk("cart/actGetProductsByItems", async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemId = Object.keys(cart.items); //[1,2,3,6,8]
    if(!itemId.length){
        return fulfillWithValue([]);
    }
    try {
        const concatenatedItemsId = itemId.map((key) => `id=${key}`).join("&");
        const response = await axios.get<TResponse>(`/products?${concatenatedItemsId}`, { signal });
        return response.data; // action.payload in fulfilled case
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
 });

 export default actGetProductsByItems;