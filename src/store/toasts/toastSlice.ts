import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { TToast } from "@types";

interface IToastSlice {
  records: TToast[]; // [{id,type,title,message}]
}
const initialState: IToastSlice = {
  records: [],
};
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<TToast>) => {
      state.records.push({
        id: nanoid(),
        type: action.payload.type,
        title: action.payload.title || action.payload.title,
        message: action.payload.message,
        delayAppearance: action.payload.delayAppearance || false,
        onCloseToast: action.payload.onCloseToast,
      });
    },
    removeToast: (state, action) => {
      state.records = state.records.filter((el) => el.id !== action.payload); // ارجاع العناصر التى تحقق الشرط فقط
    },
    stopDelayAppearance: (state, action) => {
      state.records.map((el) => {
        if (el.id === action.payload) {
          return (el.delayAppearance = false);
        }
        return el;
      });
    },
  },
});

export const { addToast, removeToast, stopDelayAppearance } = toastSlice.actions;
export default toastSlice.reducer;
