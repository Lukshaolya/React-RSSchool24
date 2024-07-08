import React from 'react';

import styles from './SearchBar/SearchBar.module.css';

interface ErrorState {
  throwError: boolean;
}

class ErrorFake extends React.Component<unknown, ErrorState> {
  state = {
    throwError: false,
  };
  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError == true) {
      throw new Error('This is a test error!');
    }
    return (
      <button className={styles.search__btn} onClick={this.handleClick}>
        Throw Error
      </button>
    );
  }
}
export default ErrorFake;
