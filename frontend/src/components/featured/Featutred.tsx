import React from 'react'
import './Featured.scss'
import man from "../../assets/img/man.png"
import searchIcon from "../../assets/img/search.png"

function Featutred() {
  return (
    <div className='featured'>
        <div className='container'>
            <div className='left'>
                <h1>Find the perfect <i>freelancing</i> services for your buisness</h1>

                <div className='search'>
                    <div className="searchInput">
                        <img src={searchIcon} alt=''/>
                        <input type='text' placeholder='Try "Building Mobile App"'/>
                    </div>
                    <button>Search</button>

                </div>

                <div className='popular'>
                    <span>Popular : </span>

                    <button>Website Design</button>
                    <button>WordPress</button>
                    <button>Logo Design</button>
                    <button>AI Services</button>
                </div>
            </div>

            <div className='right'>
                <img src={man}/>
            </div>
        </div>
    </div>
  )
}

export default Featutred