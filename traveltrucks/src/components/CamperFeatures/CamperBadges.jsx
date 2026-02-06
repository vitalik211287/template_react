import css from "./CamperFeatures.module.css";
import { getBadgeItems } from "../../utils/camperSchema";

export default function CamperBadges({ camper }) {
  const items = getBadgeItems(camper);

  if (!items.length) return null;

  return (
    <div className={css.features}>
      {items.map((it) => (
        <span key={it.key} className={css.feature}>
          {it.icon && <img className={css.icon} src={it.icon} alt="" />}
          {it.label}
        </span>
      ))}
    </div>
  );
}
