// src/components/Filters/Filters.jsx
import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setForm,
  toggleFeature,
  resetFilters,
} from "../../redux/filters/filtersSlice";
import { resetResults } from "../../redux/campers/campersSlice";
import css from "./Filters.module.css";

import { CAMPER_FIELDS, EQUIPMENT_ORDER } from "../../utils/camperSchema";

// Опції типу кемпера (це не “поле з бекенду”, а допустимі значення form)
const FORM_OPTIONS = [
  { value: "panelTruck", label: "Van", icon: "/bi_grid.png" },
  {
    value: "fullyIntegrated",
    label: "Fully Integrated",
    icon: "/bi_grid-1x2.png",
  },
  { value: "alcove", label: "Alcove", icon: "/bi_grid-3x3-gap.png" },
];

// Будуємо equipment-плитки із camperSchema (жодного хардкоду ключів)
const EQUIPMENT_TILES = EQUIPMENT_ORDER.map((key) => ({
  key,
  cfg: CAMPER_FIELDS[key],
}))
  .filter(({ cfg }) => cfg?.group === "equipment")
  // engine тут краще не показувати як toggle, бо це не boolean (petrol/diesel/...)
  .filter(({ key }) => key !== "engine")
  .map(({ key, cfg }) => ({
    key,
    label: cfg.label,
    icon: cfg.icon,
  }));

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.filters);

  const onSearch = () => {
    dispatch(resetResults());
    // якщо робитимеш запит на бекенд — тут викличеш fetchCampers(filters)
  };

  const onReset = () => {
    dispatch(resetFilters());
    dispatch(resetResults());
  };

  return (
    <aside className={css.aside}>
      <div className={css.block}>
        <label className={css.label}>Location</label>

        <div className={css.locationWrap}>
          <span className={css.locationIcon}>📍</span>
          <input
            className={css.input}
            type="text"
            placeholder="Kyiv, Ukraine"
            value={filters.location || ""}
            onChange={(e) => dispatch(setLocation(e.target.value))}
          />
        </div>
      </div>

      <div className={css.block}>
        <div className={css.filtersTitle}>Filters</div>

        <h3 className={css.h3}>Vehicle equipment</h3>
        <div className={css.divider} />

        <div className={css.tiles}>
          {EQUIPMENT_TILES.map((it) => {
            const active = Boolean(filters.features?.[it.key]);

            return (
              <button
                key={it.key}
                type="button"
                className={`${css.tile} ${active ? css.tileActive : ""}`}
                onClick={() => dispatch(toggleFeature(it.key))}
              >
                <span className={css.tileIcon}>
                  <img src={it.icon} alt={it.label} />
                </span>
                <span className={css.tileText}>{it.label}</span>
              </button>
            );
          })}
        </div>

        <h3 className={css.h3} style={{ marginTop: 20 }}>
          Vehicle type
        </h3>
        <div className={css.divider} />

        <div className={css.tiles}>
          {FORM_OPTIONS.map((t) => {
            const active = filters.form === t.value;

            return (
              <button
                key={t.value}
                type="button"
                className={`${css.tile} ${active ? css.tileActive : ""}`}
                onClick={() => dispatch(setForm(active ? "" : t.value))}
              >
                <span className={css.tileIcon}>
                  <img src={t.icon} alt={t.label} />
                </span>
                <span className={css.tileText}>{t.label}</span>
              </button>
            );
          })}
        </div>

        <button className={css.searchBtn} type="button" onClick={onSearch}>
          Search
        </button>

        <button className={css.resetBtn} type="button" onClick={onReset}>
          Reset filters
        </button>
      </div>
    </aside>
  );
}
