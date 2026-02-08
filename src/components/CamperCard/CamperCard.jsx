import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import { makeSelectIsFavorite } from "../../redux/favorites/favoritesSelectors";
import { formatPrice } from "../../utils/formatPrice";
import css from "./CamperCard.module.css";

import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlinePlace,
  MdOutlineMap,
} from "react-icons/md";
import { FaStar } from "react-icons/fa";

import CamperBadges from "../CamperFeatures/CamperBadges";

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const isFav = useSelector(makeSelectIsFavorite(camper.id));

  const imgObj = camper.gallery?.[0];
  const img =
    (typeof imgObj === "string" ? imgObj : imgObj?.thumb || imgObj?.original) ||
    "";

  const rating = camper.rating ?? 0;
  const reviewsCount = camper.reviews?.length ?? 0;

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
                aria-label={
                  isFav ? "Remove from favorites" : "Add to favorites"
                }
                onClick={() => dispatch(toggleFavorite(camper.id))}
              >
                {isFav ? <MdFavorite /> : <MdFavoriteBorder />}
              </button>
            </div>
          </div>

          <div className={css.ratingRow}>
            <span className={css.rating}>
              <FaStar className={css.star} />
              {rating}
              <span className={css.reviews}>({reviewsCount} Reviews)</span>
            </span>

            <span className={css.locationRow}>
              <MdOutlineMap className={css.place} />
              {camper.location}
            </span>
          </div>

          {/* Плашки (один раз) */}
          <div className={css.badgesRow}>
            <CamperBadges camper={camper} />
          </div>

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
