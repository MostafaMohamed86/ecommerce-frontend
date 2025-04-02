import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "@utils";
import { RootState } from "@store/index";

const actLikeToggle = createAsyncThunk("wishlist/actLikeToggle", async (id: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
        const isRecordExist = await axios
            .get(`https://67cf29c0823da0212a81ac7f.mockapi.io/wishlist?userId=${auth.user?.id}&productId=${id}`)
            .then((response) => response.data) 
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    return [];
                }
                throw error;
            });

        if (isRecordExist.length > 0) {
            await axios.delete(`https://67cf29c0823da0212a81ac7f.mockapi.io/wishlist/${isRecordExist[0].id}`); // remove from backend
            return { type: "remove", id }; // action.payload 
        } else {
            await axios.post("https://67cf29c0823da0212a81ac7f.mockapi.io/wishlist", { userId: auth.user?.id, productId: id }); // remove from frontend
            return { type: "add", id }; // action.payload
        }
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default actLikeToggle;
