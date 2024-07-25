import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import EventDetails from './pages/eventDetails/EventDetails';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import NotFound from './pages/notFound/NotFound';
import App from './App';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // Página inicial
        element: <Home />,
      },
      {
        path: 'event-details',
        element: <EventDetails />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);