import { useMemo, useState } from "react";
import { formatPrice } from "../../utils/formatPrice";
import Reviews from "../Reviews/Reviews";
import BookingForm from "../BookingForm/BookingForm";
import css from "./CamperDetails.module.css";

import { FaStar } from "react-icons/fa";
import { MdOutlineMap } from "react-icons/md";

const FEATURES = [
  "transmission",
  "engine",
  "AC",
  "bathroom",
  "kitchen",
  "TV",
  "radio",
  "refrigerator",
  "microwave",
  "gas",
  "water",
];

const DETAILS = ["form", "length", "width", "height", "tank", "consumption"];

export default function CamperDetails({ camper }) {
  const [tab, setTab] = useState("features");

  const images = useMemo(() => {
    const g = Array.isArray(camper.gallery) ? camper.gallery : [];
    return g.map((it) => it?.original || it?.thumb).filter(Boolean);
  }, [camper.gallery]);

  const reviewsCount = Array.isArray(camper.reviews)
    ? camper.reviews.length
    : 0;

  return (
    <div className={css.wrap}>
      <div className={css.header}>
        <div>
          <h2 className={css.title}>{camper.name}</h2>

          <div className={css.metaRow}>
            <span className={css.rating}>
              <FaStar className={css.star} />
              {camper.rating} ({reviewsCount} Reviews)
            </span>

            <span className={css.location}>
              <MdOutlineMap className={css.mapIcon} />
              {camper.location}
            </span>
          </div>
        </div>

        <div className={css.price}>€ {formatPrice(camper.price)}</div>
      </div>

      <div className={css.gallery}>
        {images.length ? (
          images.map((src, i) => (
            <img
              key={src + i}
              className={css.img}
              src={src}
              alt={`${camper.name} ${i + 1}`}
              loading="lazy"
            />
          ))
        ) : (
          <div className={css.noimg}>No images</div>
        )}
      </div>

      <p className={css.desc}>{camper.description}</p>

      {/* tabs */}
      <div className={css.tabs}>
        <button
          type="button"
          className={`${css.tab} ${tab === "features" ? css.tabActive : ""}`}
          onClick={() => setTab("features")}
        >
          Features
        </button>
        <button
          type="button"
          className={`${css.tab} ${tab === "reviews" ? css.tabActive : ""}`}
          onClick={() => setTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={css.grid}>
        <div className={css.card}>
          {tab === "features" ? (
            <>
              <h3 className={css.h3}>Vehicle equipment</h3>
              <ul className={css.ul}>
                {FEATURES.filter((k) => camper[k]).map((k) => (
                  <li key={k} className={css.li}>
                    {k}: {String(camper[k])}
                  </li>
                ))}
              </ul>

              <h3 className={css.h3}>Vehicle details</h3>
              <ul className={css.ul}>
                {DETAILS.filter((k) => camper[k]).map((k) => (
                  <li key={k} className={css.li}>
                    {k}: {String(camper[k])}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Reviews reviews={camper.reviews} />
          )}
        </div>

        <div className={css.side}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
