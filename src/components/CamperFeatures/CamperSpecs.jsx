import css from "./CamperFeatures.module.css";
import { getSpecItems } from "../../utils/camperSchema";

export default function CamperSpecs({ camper, group, title }) {
  const items = getSpecItems(camper, group);

  if (!items.length) return null;

  return (
    <>
      {title && (
        <>
          <h3 className={css.h3}>{title}</h3>
          <div className={css.divider} />
        </>
      )}

      <ul className={css.ul}>
        {items.map((it) => (
          <li key={it.key} className={css.li}>
            <span className={css.k}>{it.label}</span>
            <span className={css.v}>{String(it.value)}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
