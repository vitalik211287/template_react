import { Link } from "react-router-dom";
import css from "./Hero.module.css";
import heroImg from "../../../public/Hero.jpg"; // або public

export default function Hero() {
  return (
    <section
      className={css.hero}
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className={css.overlay} />

      <div className={css.hero_container}>
        <div className={css.content}>
          <h1 className={css.title}>Explore the world with comfort</h1>
          <p className={css.subtitle}>
            Choose the perfect camper for your next adventure
          </p>

          <Link className={css.btn} to="/catalog">
            View Now
          </Link>
        </div>
      </div>
    </section>
  );
}
