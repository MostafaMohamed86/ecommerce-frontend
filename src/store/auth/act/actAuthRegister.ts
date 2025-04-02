import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("🚀 Form Data:", formData);

    try {
      const response = await axios.post(
        "https://ecommerce-backend-production-b0a9.up.railway.app/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Registration Error Details:", error);
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthRegister;