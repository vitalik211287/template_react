import css from "./Reviews.module.css";

function Stars({ value }) {
  const v = Math.max(0, Math.min(5, Number(value) || 0));
  const full = Math.round(v);
  return (
    <span className={css.stars} aria-label={`rating ${v} of 5`}>
      {"★★★★★".slice(0, full)}
      <span className={css.muted}>{"★★★★★".slice(0, 5 - full)}</span>
    </span>
  );
}

export default function Reviews({ reviews = [] }) {
  if (!reviews.length) return <p className={css.empty}>No reviews yet.</p>;

  return (
    <div className={css.box}>
      {/* <h3 className={css.title}>Reviews</h3> */}

      <ul className={css.list}>
        {reviews.map((r, idx) => (
          <li key={idx} className={css.item}>
            <div className={css.head}>
              <span className={css.avatar}>
                {r.reviewer_name?.charAt(0)?.toUpperCase() || "A"}
              </span>
              <div className={css.meta}>
                <strong>{r.reviewer_name || "Anonymous"}</strong>
                <Stars value={r.reviewer_rating} />
              </div>
            </div>
            <p className={css.text}>{r.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
