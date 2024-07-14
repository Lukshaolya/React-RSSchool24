import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './containers/Layout';
import ErrorBoundary from './components/ErrorBoundry/ErrorBoundry';
import MainPage from './containers/MainPage/MainPage';
import CharacterDetailed from './components/CharacterDetailed/CharacterDetailed';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';
import './App.css';

const router = createBrowserRouter([
  {
    path: 'React-RSSchool24/',
    element: (
      <Layout>
        <MainPage />
      </Layout>
    ),
    children: [
      {
        path: '',
        element: <CharacterDetailed />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    );
  }
}

export default App;
