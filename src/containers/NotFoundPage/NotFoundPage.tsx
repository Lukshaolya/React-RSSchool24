import { useLocation, useNavigate } from 'react-router';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className={styles.notfound_block}>
      <h3>
        It hits hard, Morty, then it slowly fades, leaving you stranded in a
        failing marriage.
      </h3>
      <h4>
        No match for <u>{location.pathname}</u>
      </h4>
      <div className={styles.img}> </div>
      <button onClick={() => navigate(-1)}>to Main Page</button>
    </div>
  );
};

export default NotFoundPage;
