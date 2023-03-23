import React, { useState,useEffect } from 'react'
import './Navbar.scss'
import { Link, useLocation } from 'react-router-dom'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'

function Navbar() {

  const {pathname} = useLocation()

  const navigate = useNavigate()

  const [active,setActive] = useState(false)

  const isActive = () => {
    window.scrollY ? setActive(true):setActive(false)
  }

  useEffect(() => {
   window.addEventListener("scroll", isActive)

   return () => {
    window.removeEventListener("scroll",isActive)
   }
  }, [])

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const [open,setOpen] = useState(false)

  const handleLogout = async () => {
    await newRequest.post("/auth/logout")
    localStorage.removeItem("currentUser")
    navigate("/")
  }

  return (
    <div className={active || pathname !== "/" ? 'navbar active' : 'navbar'}>
        <div className='container'>
            <div className='logo'>
                <Link to="/" className='link'>
                <span className='text'>fiverr</span>
                </Link>
                <span className='dot'>.</span>
            </div>

            <div className='links'>
                <span>Fiverr Buisness</span>
                <span>Explore</span>
                <span>English</span>
                {!currentUser?.isSeller && ( <span>Become a Seller</span>)}
                
                {currentUser ? (
                  <div className='user' onClick={() => setOpen(!open)}>
                    <img src={currentUser.img} alt=''/>
                    <span>{currentUser?.username}</span>

                    {open && (
                      <div className='options'>
                      {currentUser.isSeller && (
                        <>
                        <Link className='link' to="/myGigs">Gigs</Link>
                        <Link className='link' to ="/add">Add New Gig</Link>
                        </>
                      )}

                      <Link className='link' to="/orders">Orders</Link>
                      <Link className='link' to="messages">Messages</Link>
                      <Link className='link' onClick={handleLogout} to={''}>Logout</Link>
                    </div>
                    )}

                    
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="link">Sign in</Link>
                    <Link className="link" to="/register">
                      <button>Join</button>
                    </Link>
                  </>
                )}

            </div>

        </div>
        {(active || pathname !== "/") && (
          <>
          <hr/>
        <div className='menu'>
          
        <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>

        </div>
          </>
        )}
    </div>
  )
}

export default Navbar