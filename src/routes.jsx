import React, { useContext } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import EventDetails from './pages/eventDetails/EventDetails';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import NotFound from './pages/notFound/NotFound';
import App from './App';
import { AuthContext } from './utils/UseAuth';
import Tickets from './pages/tickets/Tickets';
import Profile from './pages/profile/Profile';

const AppWrapper = () => {
  const { isAuthentic, setIsAuthentic } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true, // Página inicial
          element: <Home isAuthentic={isAuthentic} />,
        },
        {
          path: 'login',
          element: <Login setIsAuthentic={setIsAuthentic}/>,
        },
        {
          path: 'signup',
          element: <Signup />,
        },
        {
          path: 'event-details',
          element: <EventDetails />,
        },
        {
          path: 'tickets',
          element: <Tickets />,
        },
        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;

};

export default AppWrapper;