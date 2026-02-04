export const selectFavorites = (state) => state.favorites.ids;
export const makeSelectIsFavorite = (id) => (state) =>
  state.favorites.ids.includes(String(id));
