import React from 'react';
import ResultList from '../ResultList/ResultList';

import styles from './SearchBar.module.css';
import ErrorFake from '../Error';

interface SearchProps {
  apiUrl: string;
}

interface SearchState {
  inputValue: string;
  searchResults: Array<PokemonObj>;
  loadding: boolean;
  errorValue: boolean;
}

interface PokemonObj {
  id: number;
  name: string;
  img: string;
  status: string;
  gender: string;
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: this.getInputValueFromLocalStorage(),
      searchResults: [],
      loadding: true,
      errorValue: false,
    };
    this.handleErrorValueChange = this.handleErrorValueChange.bind(this);
  }

  getInputValueFromLocalStorage() {
    const storedSearch = localStorage.getItem('searchValue');
    return storedSearch ? storedSearch : '';
  }

  componentDidMount = async () => {
    // localStorage.clear();
    const { apiUrl } = this.props;
    if (!this.state.inputValue) {
      try {
        const response = await fetch(`${apiUrl}`);
        const data = await response.json();
        this.setState({ searchResults: data.results });
        this.setState({ loadding: false });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch(`${apiUrl}?name=${this.state.inputValue}`);
        const data = await response.json();
        this.setState({ searchResults: data.results });
        this.setState({ loadding: false });
      } catch (error) {
        console.error(error);
      }
    }
  };

  handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    this.setState({ loadding: true });
    if (/[\u0400-\u04FF]/.test(this.state.inputValue)) {
      e.preventDefault();
      alert('Please dont use russian on website');
      localStorage.setItem('searchValue', '');
      this.setState({ errorValue: false });
    }
    e.preventDefault();
    localStorage.setItem('searchValue', this.state.inputValue);
    const { apiUrl } = this.props;
    try {
      const response = await fetch(`${apiUrl}?name=${this.state.inputValue}`);
      const data = await response.json();
      if (!response.ok) {
        localStorage.setItem('searchValue', '');
        this.setState({ errorValue: true });
        this.setState({ loadding: false });
      }
      this.setState({ searchResults: data.results });
      this.setState({ loadding: false });
    } catch (error) {
      console.error(error);
    }
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value.trim() });
  };

  handleError = () => {
    throw new Error('We test ErrorBoundary component');
  };

  handleErrorValueChange(newErrorValue: boolean) {
    this.setState({ errorValue: newErrorValue });
    localStorage.setItem('searchValue', '');
  }

  render() {
    const { inputValue, searchResults, errorValue, loadding } = this.state;
    return (
      <div className={styles.search_block}>
        <form onSubmit={this.handleSearch}>
          <input
            type="search"
            value={inputValue}
            onChange={this.handleInputChange.bind(this)}
            placeholder="Search..."
            className={styles.search__input}
          />
          <button type="submit" className={styles.search__btn}>
            Search
          </button>
          <ErrorFake />
        </form>
        <ResultList
          searchResults={searchResults}
          errorValue={errorValue}
          loadding={loadding}
          onErrorValueChange={this.handleErrorValueChange}
        />
      </div>
    );
  }
}

export default Search;
