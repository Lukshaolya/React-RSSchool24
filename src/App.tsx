import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import UncontrolledForm from './pages/Uncontrolled/UncontrolledForm';
import ControlledForm from './pages/Controlled/ControlledForm';
import Layout from './pages/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/uncontrolled',
        element: <UncontrolledForm />,
      },
      {
        path: '/controlled',
        element: <ControlledForm />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
