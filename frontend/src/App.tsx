import React from 'react'
import Navbar from './components/navbar/Navbar'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Gigs from './pages/gigs/Gigs';
import MyGigs from './pages/myGigs/MyGigs';
import Orders from './pages/orders/Orders';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import Add from './pages/add/Add';
import Gig from './pages/gig/Gig';
import Login from './pages/login/Login';
import Register from './pages/register/Register';


const Layout = () => {
  return (
    <div className='app'>
      <Navbar/>
        <Outlet/>
      <Footer/>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/gigs",
        element: <Gigs />,
      },
      {
        path: "/myGigs",
        element: <MyGigs />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/message/:id",
        element: <Message />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/gig/:id",
        element: <Gig />,
      },
    ]
  },
  {
    path: 'login',
    element: <Login/>
  },
  {
    path:'register',
    element: <Register/>
  }
]);

function App() {
  return (
    <>
  <RouterProvider router={router} />
    </>
  )
}

export default App  