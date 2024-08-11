import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div>
      <div className={styles.container}>
        <header>
          <div className={styles.header_logo}>
            <img src={logo} alt="logo" />
          </div>
          <ul className={styles.header_nav_block}>
            <li>
              <NavLink to="/React-RSSchool24/?page=1">Main Page</NavLink>
            </li>
            <li>
              <NavLink to="*">Not found page</NavLink>
            </li>
          </ul>
        </header>
      </div>
    </div>
  );
};

export default Header;
