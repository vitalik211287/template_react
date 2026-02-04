import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import { makeSelectIsFavorite } from "../../redux/favorites/favoritesSelectors";
import { formatPrice } from "../../utils/formatPrice";
import css from "./CamperCard.module.css";

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const isFav = useSelector(makeSelectIsFavorite(camper.id));

 const img = camper.gallery?.[0]?.thumb || camper.gallery?.[0]?.original || "";

  return (
    <div className={css.card}>
      <div className={css.top}>
        <div className={css.preview}>
          {img ? (
            <img
              className={css.img}
              src={img}
              alt={camper.name}
              loading="lazy"
            />
          ) : (
            <div className={css.noimg}>No image</div>
          )}
        </div>

        <div className={css.info}>
          <div className={css.head}>
            <h3 className={css.name}>{camper.name}</h3>

            <div className={css.priceRow}>
              <span className={css.price}>€ {formatPrice(camper.price)}</span>

              <button
                className={css.fav}
                type="button"
                onClick={() => dispatch(toggleFavorite(camper.id))}
              >
                {isFav ? "★" : "☆"}
              </button>
            </div>
          </div>

          <p className={css.meta}>{camper.location}</p>

          <p className={css.desc}>{camper.description}</p>

          <Link
            className={css.more}
            to={`/catalog/${camper.id}`}
            target="_blank"
            rel="noreferrer"
          >
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
}
