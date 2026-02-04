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

// фільтрація по вимогах (location, form, features)
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

// пагінація (Load more) поверх відфільтрованих
export const selectVisibleCampers = createSelector(
  [selectFilteredCampers, selectPage, selectLimit],
  (filtered, page, limit) => filtered.slice(0, page * limit),
);

export const selectHasMore = createSelector(
  [selectFilteredCampers, selectVisibleCampers],
  (filtered, visible) => visible.length < filtered.length,
);
