
import { isString, TLoading, TProduct } from "@types";
import { createSlice } from "@reduxjs/toolkit";
import actGetProductsSlice from "./act/actGetProducts";


interface IProductSlice {
    records: TProduct[],
    loading: TLoading,
    error: string | null;
}
const initialState:IProductSlice = {
    records: [],
    loading: "idle",
    error: null
}
const productsSlice = createSlice({
    initialState,
    name: "products",
    reducers: {
        cleanUpProductsRecords: (state) => {
            state.records = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actGetProductsSlice.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetProductsSlice.fulfilled, (state, action) => {
            state.records = action.payload;
            state.loading = "succeeded";
        });
        builder.addCase(actGetProductsSlice.rejected, (state, action) => {
            if(isString(action.payload))
                state.error = action.payload; // or action.payload as string (without doing the if condition)
                state.loading = "failed";
        })
    }
})


export const {cleanUpProductsRecords} = productsSlice.actions;
export { actGetProductsSlice };
export default productsSlice.reducer;