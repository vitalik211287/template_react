import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers, fetchCamperById } from "./campersOps";

const initialState = {
  items: [],
  loading: false,
  error: null,

  page: 1,
  limit: 4,

  details: null,
  detailsLoading: false,
  detailsError: null,

  hasMore: true, 
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    resetResults(state) {
      state.items = [];
      state.page = 1;
      state.error = null;
      state.hasMore = true;
    },
    clearDetails(state) {
      state.details = null;
      state.detailsLoading = false;
      state.detailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;

        const { items, page, limit } = action.payload;

        if (page === 1) state.items = items;
        else state.items = [...state.items, ...items];

        state.page = page;

    
        if (typeof limit === "number") {
          state.hasMore = items.length === limit;
        }
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error?.message || "Request failed";
      })


      .addCase(fetchCamperById.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError =
          action.payload || action.error?.message || "Request failed";
      });
  },
});

export const { resetResults, clearDetails } = campersSlice.actions;
export default campersSlice.reducer;
