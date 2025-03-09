import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import { authLogout } from "@store/auth/authSlice";
import actGetWishlist from "./act/actGetWishlist";
import { isString, TLoading, TProduct } from "@types";
interface IWishlist  {
    itemsId: number[];
    productsFullInfo: TProduct[];
    loading: TLoading;
    error: null | string;
}
const initialState: IWishlist = {
    itemsId: [], // for checking if liked or nor and showing the length the of array
    productsFullInfo: [],
    loading: "idle",
    error: null,
}
const wishlistSlice = createSlice({
    initialState,
    name: "wishlist",
    reducers: {
        CleanWishlistProductsFullInfo: (state) => {
            state.productsFullInfo = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actLikeToggle.pending, (state) => {
            state.error = null;
        });
        builder.addCase(actLikeToggle.fulfilled, (state, action) => {
            const { type, id } = action.payload;
            if(type === "remove"){
                state.itemsId = state.itemsId.filter(el => el !== action.payload.id);
                state.productsFullInfo = state.productsFullInfo.filter(el => el.id !== action.payload.id)
            }else{
                state.itemsId.push(id);
            }
        });
        builder.addCase(actLikeToggle.rejected, (state, action) => {
            if(isString(action.payload))
                state.error = action.payload;
        });
        // get wishlist items
        builder.addCase(actGetWishlist.pending, (state) => {
            state.error = null;
            state.loading = "pending";
        });
        builder.addCase(actGetWishlist.fulfilled, (state, action) => {
            state.loading = "succeeded";
            if(action.payload.dataType === "productsFullInfo"){
                state.productsFullInfo = action.payload.data as TProduct[];
            }else{
                state.itemsId = action.payload.data as number[];
            }
        });
        builder.addCase(actGetWishlist.rejected, (state, action) => {
            if(isString(action.payload))
                state.error = action.payload;
                state.loading = "failed";
        });
        // when logout
        builder.addCase(authLogout, state => {
            state.productsFullInfo = [];
            state.itemsId = [];
        })
    }
});

export const { CleanWishlistProductsFullInfo } = wishlistSlice.actions;
export { actLikeToggle, actGetWishlist };
export default wishlistSlice.reducer;