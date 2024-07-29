import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './context/ThemeProvider.tsx';
import { Provider } from 'react-redux';
// import { ApiProvider } from '@reduxjs/toolkit/query/react';
import App from './App.tsx';
import './index.css';
// import { dataApi } from './store/apiSlice.js';
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApiProvider api={dataApi}> */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
      {/* </ApiProvider> */}
    </Provider>
  </React.StrictMode>,
);
