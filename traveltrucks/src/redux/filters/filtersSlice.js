import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  form: "", // наприклад: "panelTruck", "fullyIntegrated", "alcove" (що прийде з API)
  features: {
    AC: false,
    bathroom: false,
    kitchen: false,
    TV: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setForm(state, action) {
      state.form = action.payload;
    },
    toggleFeature(state, action) {
      const key = action.payload;
      state.features[key] = !state.features[key];
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setLocation, setForm, toggleFeature, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
