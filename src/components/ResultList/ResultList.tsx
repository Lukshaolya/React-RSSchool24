import { useDispatch } from 'react-redux';
import { ResultListProps, SearchResultsObj } from '../../types';
import loader from './../../assets/loader.png';
import styles from './ResultList.module.css';
import { addItem, removeItem } from '../../store/slice';
import { ChangeEvent, useEffect, useState } from 'react';

interface CheckedState {
  [key: number]: boolean;
}

const ResultList = ({
  searchResults,
  loading,
  error,
  onItemClick,
  savedStore,
}: ResultListProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!savedStore.length) {
      setCheckedState({});
    }
    console.log(savedStore);
  }, [savedStore]);

  const [checkedState, setCheckedState] = useState<CheckedState>({});

  const checkHandler =
    (item: SearchResultsObj) => (event: ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      setCheckedState((prevState) => {
        const newState = { ...prevState, [item.id]: isChecked };
        console.log(newState);

        if (isChecked) {
          dispatch(addItem(item));
        } else {
          console.log(item);
          dispatch(removeItem(item));
        }

        return newState;
      });
    };

  const isChecked = (id: number) => checkedState[id] || false;

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
          onClick={(e) => {
            e.stopPropagation();
            console.log(e.target);

            onItemClick(result.id);
          }}
        >
          <div className={styles.checked_block}>
            <input
              type="checkbox"
              checked={isChecked(result.id)}
              onChange={checkHandler(result)}
            />
          </div>
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
