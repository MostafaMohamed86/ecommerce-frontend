import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { TLoading, TCategory, isString } from "@types";



interface ICategoriesState {
    records: TCategory[];
    loading: TLoading;
    error: string | null;
}
const initialState: ICategoriesState = {
    records: [],
    loading: "idle",
    error: null,
};
const categoriesSlice = createSlice({
    initialState,
    name: "categories",
    reducers: {
        categoriesRecordsCleanUp: (state) => {
            state.records = [];
        }
    },
    extraReducers:(builder) => {
        builder.addCase(actGetCategories.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        })
        builder.addCase(actGetCategories.fulfilled, (state, action) => {
            state.records = action.payload;
            state.loading = "succeeded";
        })
        builder.addCase(actGetCategories.rejected, (state, action) => {
            if(isString(action.payload))
            state.error = action.payload; // or action.payload as string (without doing the if condition)
            state.loading = "failed";
        })
    }
});

export { actGetCategories };
export const { categoriesRecordsCleanUp } = categoriesSlice.actions;
export default categoriesSlice.reducer;