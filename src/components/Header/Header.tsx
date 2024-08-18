import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <>
      <div>
        <div className="container">
          <header>
            <div className="header_logo">{/* <img s alt="logo" /> */}</div>
            <ul className="header_nav_block">
              <li>
                <NavLink to="/">Main Page</NavLink>
              </li>
              <li>
                <NavLink to="/controlled">Controlled</NavLink>
              </li>
              <li>
                <NavLink to="/un">UnControlled</NavLink>
              </li>
            </ul>
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
