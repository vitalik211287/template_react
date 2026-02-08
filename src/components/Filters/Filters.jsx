import { useDispatch, useSelector } from "react-redux";
import {
  setLocation,
  setForm,
  toggleFeature,
  resetFilters,
} from "../../redux/filters/filtersSlice";
import { resetResults } from "../../redux/campers/campersSlice";
import css from "./Filters.module.css";
import { MdOutlineMap } from "react-icons/md";
import { fetchCampers } from "../../redux/campers/campersOps";
import {
  CAMPER_FIELDS,
  EQUIPMENT_ORDER,
  FORM_OPTIONS,
} from "../../utils/camperSchema";

const EQUIPMENT_TILES = EQUIPMENT_ORDER.map((key) => ({
  key,
  cfg: CAMPER_FIELDS[key],
}))
  .filter(({ cfg }) => cfg?.group === "equipment")

  .filter(({ key }) => key !== "engine")
  .map(({ key, cfg }) => ({
    key,
    label: cfg.label,
    icon: cfg.icon,
  }));

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.filters);

  const LIMIT = 4;

  const onSearch = () => {
    dispatch(resetResults());
    dispatch(fetchCampers({ filters, page: 1, limit: LIMIT }));
  };

  const onReset = () => {
    dispatch(resetFilters());
    dispatch(resetResults());

    dispatch(
      fetchCampers({
        filters: { location: "", form: "", features: {} },
        page: 1,
        limit: LIMIT,
      }),
    );
  };

  return (
    <aside className={css.aside}>
      <div className={css.block}>
        <label className={css.label}>Location</label>

        <div className={css.locationWrap}>
          <span className={css.locationIcon}>
            <MdOutlineMap className={css.icon} />
          </span>
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

        <h3 className={css.h3} style={{ marginTop: 32 }}>
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
