import { NavLink, Outlet } from "react-router-dom";
import css from "./Layout.module.css";

export default function Layout() {
  const linkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <>
      <header className={`${css.header} ${css.container}`}>
        <div className={css.inner}>
          {/* ЛОГО → Home */}
          <NavLink to="/" end className={css.brand}>
            TravelTrucks
          </NavLink>

          <nav className={css.nav}>
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>

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
