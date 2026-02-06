import { NavLink, Outlet } from "react-router-dom";
import css from "./Layout.module.css";

export default function Layout() {
  const linkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <>
      <header className={css.header}>
        <div className={css.inner}>
          <div className={css.brand}>TravelTrucks</div>

          <nav className={css.nav}>
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>

            {/* ✅ важливо: end */}
            <NavLink to="/catalog" end className={linkClass}>
              Catalog
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
