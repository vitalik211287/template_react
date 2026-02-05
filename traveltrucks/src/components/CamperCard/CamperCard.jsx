import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favorites/favoritesSlice";
import { makeSelectIsFavorite } from "../../redux/favorites/favoritesSelectors";
import { formatPrice } from "../../utils/formatPrice";
import css from "./CamperCard.module.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import { FaGasPump, FaSnowflake } from "react-icons/fa";
import { MdOutlineKitchen } from "react-icons/md";

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
                {isFav ? <MdFavorite /> : <MdFavoriteBorder />}
              </button>
            </div>
          </div>

          <div className={css.ratingRow}>
            <span className={css.rating}>
              <FaStar className={css.star} />
              {camper.rating}
              <span className={css.reviews}>
                ({camper.reviews?.length || 0} Reviews)
              </span>
            </span>

            <span className={css.locationRow}>
              <MdOutlinePlace />
              {camper.location}
            </span>
          </div>

          <div className={css.features}>
            {camper.transmission === "automatic" && (
              <span className={css.feature}>
                <img
                  className={css.icon}
                  src="/diagram.png"
                  alt="Automatic transmission"
                />{" "}
                Automatic
              </span>
            )}

            {camper.engine && (
              <span className={css.feature}>
                <img className={css.icon} src="/Petrol.png" alt="Engine" />{" "}
                {camper.engine}
              </span>
            )}

            {camper.kitchen && (
              <span className={css.feature}>
                <img className={css.icon} src="/cup-hot.png" alt="Kitchen" />{" "}
                Kitchen
              </span>
            )}

            {camper.AC && (
              <span className={css.feature}>
                <img className={css.icon} src="/wind.png" alt="AC" /> AC
              </span>
            )}
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
