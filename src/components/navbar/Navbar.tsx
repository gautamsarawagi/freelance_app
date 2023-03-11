import React, { useState,useEffect } from 'react'
import './Navbar.scss'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {

  const {pathname} = useLocation()

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

  // after login and registering
  
  const currentUser = {
    id:1,
    name: 'Gautam Sarawagi', 
    isSeller:true
  }

  const [open,setOpen] = useState(false)

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
                <span>Sign In</span>
                {!currentUser?.isSeller && ( <span>Become a Seller</span>)}
                
                {!currentUser && (<button>Join</button>)}

                {currentUser && (
                  <div className='user' onClick={() => setOpen(!open)}>
                    <img src='' alt=''/>
                    <span>{currentUser?.name}</span>

                    {open && (
                      <div className='options'>
                      {currentUser.isSeller && (
                        <>
                        <Link className='link' to="/gigs">Gigs</Link>
                        <Link className='link' to ="/add">Add New Gig</Link>
                        </>
                      )}

                      <Link className='link' to="/orders">Orders</Link>
                      <Link className='link' to="messages">Messages</Link>
                      <Link className='link' to="/">Logout</Link>
                    </div>
                    )}

                    
                  </div>
                )}

            </div>

        </div>
        {(active || pathname !== "/") && (
          <>
          <hr/>
        <div className='menu'>
          <span>test</span>
          <span>test</span>
          <span>test</span>

        </div>
          </>
        )}
    </div>
  )
}

export default Navbar