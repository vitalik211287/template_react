import CamperCard from "../CamperCard/CamperCard";
import css from "./CamperList.module.css";

export default function CamperList({ campers }) {
  return (
    <div className={css.list}>
      {campers.map((c) => (
        <CamperCard key={c.id} camper={c} />
      ))}
    </div>
  );
}
