import { NavLink, Outlet } from "react-router-dom";
import css from "./Layout.module.css";

export default function Layout() {
  return (
    <>
      <header className={css.header}>
        <div className={css.inner}>
          <div className={css.brand}>TravelTrucks</div>

          <nav className={css.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
              Catalog
            </NavLink>
          </nav>
        </div>
      </header>

      <main >
        <Outlet />
      </main>
    </>
  );
}
