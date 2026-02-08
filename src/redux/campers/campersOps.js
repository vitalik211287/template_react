import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/campers");
      const data = res.data;
      return Array.isArray(data) ? data : (data?.items ?? []);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);


export const fetchCamperById = createAsyncThunk(
  "campers/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/campers/${id}`);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
