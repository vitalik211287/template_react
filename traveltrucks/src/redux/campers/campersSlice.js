import { createSlice } from "@reduxjs/toolkit";
import { fetchCamperById, fetchCampers } from "./campersOps";

const initialState = {
  items: [],
  loading: false,
  error: null,

  page: 1,
  limit: 4,

  details: null,
  detailsLoading: false,
  detailsError: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    resetResults(state) {
      state.page = 1;
    },
    loadMore(state) {
      state.page += 1;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    clearDetails(state) {
      state.details = null;
      state.detailsLoading = false;
      state.detailsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ гарантуємо, що items завжди масив
        const payload = action.payload;
        state.items = Array.isArray(payload) ? payload : (payload?.items ?? []);
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // fetch by id
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
        state.detailsError = action.payload || action.error.message;
      });
  },
});

export const { resetResults, loadMore, setLimit, clearDetails } =
  campersSlice.actions;

export default campersSlice.reducer;
