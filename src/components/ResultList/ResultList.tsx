import React from 'react';
import loader from './../../assets/loader.gif';
import styles from './../SearchBar/SearchBar.module.css';

interface Props {
  searchResults: Array<PokemonObj>;
  loadding: boolean;
  errorValue: boolean;
  onErrorValueChange: (newErrorValue: boolean) => void;
}
interface PokemonObj {
  id: number;
  name: string;
  img: string;
  status: string;
  gender: string;
}

class ResultList extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onErrorValueChange(false);
  }

  render() {
    const { searchResults, loadding, errorValue } = this.props;
    if (errorValue) {
      return (
        <div className={styles.noresults_block}>
          <h2>No results</h2>;
          <button className={styles.search__btn} onClick={this.handleClick}>
            Try again
          </button>
        </div>
      );
    }

    if (loadding) {
      return (
        <div className={styles.loader}>
          <img src={loader} alt="loader" />
        </div>
      );
    }

    return (
      <div className={styles.search_list}>
        {searchResults.map((result, index) => (
          <div key={index} className={styles.personal_info}>
            <h2>{result.name}</h2>
            <ul>
              <li>Status: {result.status}</li>
              <li>Gender: {result.gender}</li>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default ResultList;
