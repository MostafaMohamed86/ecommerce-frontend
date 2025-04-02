import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import { RootState } from "@store/index";

const actPlaceOrder = createAsyncThunk("orders/actPlaceOrder", async (subtotal:number ,thunkAPI)=> {
    const {rejectWithValue, getState} = thunkAPI;
    const {cart, auth} = getState() as RootState;
    
    const orderItems = cart.productsFullInfo.map((el) => ({
        id: el.id,
        title: el.title,
        price: el.price,
        image: el.image,
        quantity: cart.items[el.id]
    }))
    try {
        const response = await axios.post("https://67cf29c0823da0212a81ac7f.mockapi.io/orders", {
            userId: auth.user?.id,
            items: orderItems,
            subtotal,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default actPlaceOrder;