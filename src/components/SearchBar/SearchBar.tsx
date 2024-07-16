import { FormEvent, useState } from 'react';
import { SearchBarProps } from '../../types';

import styles from './SearchBar.module.css';

const SearchBar: React.FC<SearchBarProps> = ({
  onSearchSubmit,
  initialValue,
}) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearchSubmit(inputValue);
  };

  return (
    <div className={styles.search_block}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.search__input}
        />
        <button type="submit" className={styles.search__btn}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
