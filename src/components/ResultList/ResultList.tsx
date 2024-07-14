import { ResultListProps } from '../../types';
import loader from './../../assets/loader.png';
import styles from './ResultList.module.css';

const ResultList = ({
  searchResults,
  loading,
  error,
  onItemClick,
}: ResultListProps) => {
  if (loading) {
    return (
      <div className={styles.loader}>
        <img src={loader} alt="loader" />
      </div>
    );
  }

  return (
    <div className={styles.search_list}>
      {error ? <h1>error</h1> : ''}
      {searchResults.map((result, index) => (
        <div
          key={index}
          className={styles.personal_info}
          onClick={() => onItemClick(result.id)}
        >
          <h2>{result.name}</h2>
          <ul>
            <li>Status: {result.status}</li>
            <li>Gender: {result.gender}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ResultList;
