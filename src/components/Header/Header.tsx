import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { THEME_DARK, THEME_LIGHT, useTheme } from '../../context/ThemeProvider';
import LOGO_DARK from '../../assets/logo.png';
import LOGO_LIGHT from '../../assets/logo-light-2.png';
import styles from './Header.module.css';

const Header = () => {
  const isTheme = useTheme();
  const [icon, setIcon] = useState(LOGO_DARK);
  useEffect(() => {
    switch (isTheme.theme) {
      case THEME_DARK:
        setIcon(LOGO_DARK);
        break;
      case THEME_LIGHT:
        setIcon(LOGO_LIGHT);
        break;
      default:
        setIcon(LOGO_DARK);
    }
  }, [isTheme]);
  console.log(isTheme);
  return (
    <div>
      <div className={styles.container}>
        <header>
          <div className={styles.header_logo}>
            <img src={icon} alt="logo" />
          </div>
          <ul className={styles.header_nav_block}>
            <li>
              <NavLink to="/React-RSSchool24/?page=1">Main Page</NavLink>
            </li>
            <li>
              <NavLink to="*">Not found page</NavLink>
            </li>
          </ul>
          <div className={styles.change_theme_container}>
            <button
              className={
                isTheme.theme === THEME_DARK
                  ? styles.change_theme
                  : styles.change_theme_light
              }
              onClick={() => {
                isTheme.change();
              }}
            >
              {isTheme.theme === THEME_DARK ? THEME_LIGHT : THEME_DARK}
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
