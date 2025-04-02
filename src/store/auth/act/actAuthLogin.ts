import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

type TFormData = {
  email: string;
  password: string;
};

type TResponse = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  accessToken: string;
};
const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post<TResponse>("https://ecommerce-backend-production-b0a9.up.railway.app/login", formData);
      return response.data; // [access token , user:{id,firstName,lastName,email}]
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);


export default actAuthLogin;
