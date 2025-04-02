import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import axios from "axios";

type TResponse = string[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI; // signal for cancellation
    try {
      const response = await axios.get<TResponse>(
        "https://fakestoreapi.com/products/categories",
        { signal }
      );

      const categoryMapping: Record<string, { img: string; prefix: string }> = {
        electronics: {
          img: "https://static.vecteezy.com/system/resources/previews/049/160/534/non_2x/isometric-3d-ai-powered-quantum-circuit-frame-concept-as-a-border-frame-with-quantum-circuit-patterns-on-the-top-and-bottom-edges-providing-ample-copy-space-in-the-center-the-desi-png.png",
          prefix: "electronics",
        },
        jewelery: {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiaWTdJwJ6gqvjVXO2nRHq2b2PWtgSjprPpA&s",
          prefix: "jewelery",
        },
        "men's clothing": {
          img: "https://cdn-eu.dynamicyield.com/api/9876644/images/cfb357649428__hp-w12-22032022-h_m-men.jpg",
          prefix: "men",
        },
        "women's clothing": {
          img: "https://cdn-eu.dynamicyield.com/api/9876644/images/30d354267a09b__hp-w12-22032022-h_m-women_dresses.jpg",
          prefix: "women",
        },
      };

      const records = response.data.map((category, index) => {
        const mapped = categoryMapping[category] || { img: "", prefix: "" };
        return {
          id: index + 1,
          title: category,
          img: mapped.img,
          prefix: mapped.prefix,
        };
      });

      return records; // action.payload for state.records
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetCategories;
