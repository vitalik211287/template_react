import { createSlice } from "@reduxjs/toolkit";
import { EQUIPMENT_ORDER } from "../../utils/camperSchema";

const featuresInitial = Object.fromEntries(
  EQUIPMENT_ORDER.map((k) => [k, false]),
);

const initialState = {
  location: "",
  form: "", // "panelTruck", "fullyIntegrated", "alcove"
  features: featuresInitial,
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
      // ✅ захист: не додаємо випадкові ключі типу "automatic"
      if (key in state.features) {
        state.features[key] = !state.features[key];
      }
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setLocation, setForm, toggleFeature, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
