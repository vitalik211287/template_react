import { formatPrice } from "../../utils/formatPrice";
import Reviews from "../Reviews/Reviews";
import BookingForm from "../BookingForm/BookingForm";
import css from "./CamperDetails.module.css";

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
  const images = camper?.gallery ?? [];

  return (
    <div className={css.wrap}>
      <div className={css.header}>
        <h2 className={css.title}>{camper?.name}</h2>
        <div className={css.price}>€ {formatPrice(camper?.price)}</div>
      </div>

      <p className={css.location}>{camper?.location}</p>

      <div className={css.gallery}>
        {images.length ? (
          images.map((img, i) => {
            const src = img?.original || img?.thumb; // <-- ВАЖЛИВО
            return (
              <img
                key={img?.original || img?.thumb || i}
                className={css.img}
                src={src}
                alt={`${camper?.name} ${i + 1}`}
                loading="lazy"
              />
            );
          })
        ) : (
          <div className={css.noimg}>No images</div>
        )}
      </div>

      <p className={css.desc}>{camper?.description}</p>

      <div className={css.grid}>
        <div className={css.card}>
          <h3 className={css.h3}>Features</h3>
          <ul className={css.ul}>
            {FEATURES.filter((k) => camper?.[k]).map((k) => (
              <li key={k} className={css.li}>
                {k}: {String(camper[k])}
              </li>
            ))}
          </ul>

          <h3 className={css.h3}>Details</h3>
          <ul className={css.ul}>
            {DETAILS.filter((k) => camper?.[k]).map((k) => (
              <li key={k} className={css.li}>
                {k}: {String(camper[k])}
              </li>
            ))}
          </ul>
        </div>

        <div className={css.side}>
          <Reviews reviews={camper?.reviews ?? []} />
          <div className={css.spacer} />
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
