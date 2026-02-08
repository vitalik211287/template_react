import { createSelector } from "@reduxjs/toolkit";

export const selectCampers = (state) => state.campers.items;
export const selectCampersLoading = (state) => state.campers.loading;
export const selectCampersError = (state) => state.campers.error;

export const selectPage = (state) => state.campers.page;
export const selectLimit = (state) => state.campers.limit;

export const selectDetails = (state) => state.campers.details;
export const selectDetailsLoading = (state) => state.campers.detailsLoading;
export const selectDetailsError = (state) => state.campers.detailsError;

export const selectFilters = (state) => state.filters;
export const selectFavoriteIds = (state) => state.favorites.ids;
export const selectHasMore = (state) => state.campers.hasMore;
export const selectVisibleCampers = (state) => state.campers.items;


export const selectCampersPage = (s) => s.campers.page;


import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";


const clean = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== "" && v !== null && v !== undefined,
    ),
  );

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async ({ filters, page = 1, limit = 4 }, thunkAPI) => {
    try {
      const params = clean({
        page,
        limit,

    
        location: filters?.location?.trim(),
        form: filters?.form || undefined,
      });

      const res = await api.get("/campers", { params });

      const data = res.data;
      const items = Array.isArray(data) ? data : (data?.items ?? []);


      const equipment = filters?.equipment || {};
      const activeEq = Object.entries(equipment)
        .filter(([, val]) => val)
        .map(([key]) => key);

      const filtered =
        activeEq.length === 0
          ? items
          : items.filter((c) => activeEq.every((k) => Boolean(c?.[k])));

      return { items: filtered, page, limit };
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

export const selectFilteredCampers = createSelector(
  [selectCampers, selectFilters],
  (campers, filters) => {
    const list = Array.isArray(campers) ? campers : [];

    const loc = (filters?.location || "").trim().toLowerCase();
    const form = filters?.form || "";
    const features = filters?.features || {};

    return list.filter((c) => {
      // location
      if (
        loc &&
        !String(c.location || "")
          .toLowerCase()
          .includes(loc)
      ) {
        return false;
      }

      // form (vehicle type)
      if (form && c.form !== form) return false;

      // features
      for (const key of Object.keys(features)) {
        if (!features[key]) continue;

        // ✅ special case: checkbox "Automatic"
        if (key === "automatic") {
          if (c.transmission !== "automatic") return false;
          continue;
        }

        // ✅ all other checkboxes are booleans in your API
        if (!c[key]) return false;
      }

      return true;
    });
  },
);

