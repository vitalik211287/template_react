import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// helper: прибрати порожні значення
const clean = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== "" && v !== null && v !== undefined,
    ),
  );

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async ({ filters, page = 1, limit = 4 } = {}, thunkAPI) => {
    try {
      // якщо filters не передали — беремо з redux
      const stateFilters = filters ?? thunkAPI.getState().filters;
      const { location, form, features } = stateFilters;

      // ✅ перетворюємо features на query params: microwave=true, AC=true, kitchen=true ...
      const featureParams = Object.fromEntries(
        Object.entries(features || {})
          .filter(([, val]) => val === true)
          .map(([key]) => [key, true]),
      );

      const params = clean({
        page,
        limit,
        ...(location ? { location: location.trim() } : {}),
        ...(form ? { form } : {}),
        ...featureParams,
      });

      const res = await api.get("/campers", { params });

      const data = res.data;

      // ✅ API у тебе повертає { total, items }
      const items = Array.isArray(data) ? data : (data?.items ?? []);
      const total = Array.isArray(data)
        ? items.length
        : (data?.total ?? items.length);

      return { items, total, page, limit };
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
