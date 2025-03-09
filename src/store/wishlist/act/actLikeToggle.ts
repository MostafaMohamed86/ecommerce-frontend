import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {axiosErrorHandler} from "@utils";
import { RootState } from "@store/index";

const actLikeToggle = createAsyncThunk("wishlist/actLikeToggle", async (id: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    const {auth} = getState() as RootState;
    try {
        // طلب الـ GET بيجيب مصفوفة تحتوي على كائن واحد فقط يحتوي على الـ id الخاص بالمنتج اللي بيت
        const isRecordExist = await axios.get(`/wishlist?userId=${auth.user?.id}&productId=${id}`); 
        if(isRecordExist.data.length > 0){ // isRecordExist = [{}]
            // إذا كانت المصفوفة تحتوي على عنصر واحد فقط، نقوم بحذفه باستخدام الـ id الخاص به
            await axios.delete(`/wishlist/${isRecordExist.data[0].id}`); 
            return { type: "remove", id }; // action.payload
        } else {
            // إذا لم يوجد السجل، نقوم بإضافته
            await axios.post("/wishlist", { userId: auth.user?.id, productId: id });
            return { type: "add", id }; // action.payload
        }
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default actLikeToggle;