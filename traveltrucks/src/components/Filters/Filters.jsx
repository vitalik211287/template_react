import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setForm,
  toggleFeature,
  resetFilters,
} from "../../redux/filters/filtersSlice";
import { resetResults } from "../../redux/campers/campersSlice";
import css from "./Filters.module.css";

const EQUIPMENT = [
  { key: "AC", label: "AC", icon: <img src="/wind.png" /> },
  {
    key: "automatic",
    label: "Automatic",
    icon: <img src="/diagram.png" />,
  }, 
  { key: "kitchen", label: "Kitchen", icon: <img src="/cup-hot.png" /> },
  { key: "TV", label: "TV", icon: <img src="/tv.png" /> },
  { key: "bathroom", label: "Bathroom", icon: <img src="/ph_shower.png" /> },
];

const TYPES = [
  { value: "panelTruck", label: "Van", icon: <img src="/bi_grid.png" /> },
  {
    value: "fullyIntegrated",
    label: "Fully Integrated",
    icon: <img src="/bi_grid-1x2.png" />,
  },
  {
    value: "alcove",
    label: "Alcove",
    icon: <img src="/bi_grid-3x3-gap.png" />,
  },
];

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.filters);

  const onSearch = () => {
    dispatch(resetResults()); // скидаємо page = 1
    // якщо фільтр локальний — більше нічого не треба
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
          {EQUIPMENT.map((it) => {
            const active = Boolean(filters.features?.[it.key]);

            return (
              <button
                key={it.key}
                type="button"
                className={`${css.tile} ${active ? css.tileActive : ""}`}
                onClick={() => dispatch(toggleFeature(it.key))}
              >
                <span className={css.tileIcon}>{it.icon}</span>
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
          {TYPES.map((t) => {
            const active = filters.form === t.value;

            return (
              <button
                key={t.value}
                type="button"
                className={`${css.tile} ${active ? css.tileActive : ""}`}
                onClick={() => dispatch(setForm(active ? "" : t.value))}
              >
                <span className={css.tileIcon}>{t.icon}</span>
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
