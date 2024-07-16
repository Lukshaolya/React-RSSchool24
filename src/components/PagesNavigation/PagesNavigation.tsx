import { Link } from 'react-router-dom';
import { PagesNavigationProps } from '../../types';
import styles from './PagesNavigatiom.module.css';

const PagesNavigation = ({
  prevPage,
  nextPage,
  currentPage,
  pagesCount,
  fetchData,
}: PagesNavigationProps) => {
  console.log('pagination', prevPage, nextPage, currentPage);
  const pageNumber = currentPage;

  const handleChangeNext = () => {
    if (nextPage !== null) {
      fetchData(nextPage);
    }
  };

  const handleChangePrev = () => {
    if (prevPage !== null) {
      fetchData(prevPage);
    }
  };

  return (
    <div className={styles.pagination_block}>
      <Link to={`/React-RSSchool24/?page=${pageNumber - 1}`}>
        <button
          onClick={handleChangePrev}
          disabled={!prevPage}
          className={styles.btn}
        >
          &#706;
        </button>
      </Link>
      <p className={styles.text}>
        {currentPage} of {pagesCount}
      </p>
      <Link to={`/React-RSSchool24/?page=${pageNumber + 1}`}>
        <button
          onClick={handleChangeNext}
          disabled={!nextPage}
          className={styles.btn}
        >
          &#707;
        </button>
      </Link>
    </div>
  );
};

export default PagesNavigation;
