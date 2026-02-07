import { createSlice } from "@reduxjs/toolkit";
import { loadFavorites, saveFavorites } from "../../utils/persistFavorites";

const initialState = {
  ids: loadFavorites(), // збережеться при оновленні сторінки
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = String(action.payload);
      const exists = state.ids.includes(id);

      if (exists) {
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        state.ids.push(id);
      }

      saveFavorites(state.ids);
    },
    clearFavorites(state) {
      state.ids = [];
      saveFavorites([]);
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
