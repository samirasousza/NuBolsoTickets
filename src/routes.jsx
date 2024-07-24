import React from 'react'
import Home from './pages/home/Home'
import EventDetails from './pages/eventDetails/EventDetails'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/event-details",
        element: <EventDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ]
  },
]);
