import { NavLink } from 'react-router-dom';
import style from './Header.module.css';

export const Header = () => {
  const activeClassName = ({ isActive }) =>
    isActive ? `${style.active}` : `${style.navLinkA}`;
  return (
    <header className={style.header}>
      <nav>
        <ul className={style.navList}>
          <li>
            <NavLink to="/" end className={activeClassName}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={activeClassName}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};