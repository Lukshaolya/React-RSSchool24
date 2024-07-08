import React from 'react';
import './App.css';
import Search from './components/SearchBar/SearchBar';
import ErrorBoundary from './components/ErrorBoundry/ErrorBoundry';

const apiUrl = 'https://rickandmortyapi.com/api/character/';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <ErrorBoundary>
          <Search apiUrl={apiUrl} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
