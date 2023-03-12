import React, { useState } from 'react'
import downIcon from "../../assets/img/down.png"

import './Gigs.scss'
import { gigs } from '../../data'
import GIgCard from '../../components/gigCard/GIgCard'

function Gigs() {

  const [open,setOpen] = useState(false)

  const [sort,setSort] = useState('sales')

  const resort = (type:string) => {
    setSort(type)
    setOpen(false)
  }

  return (
    <div className='gigs'>
      <div className="container">
        <span className='breadcrumbs'> FIVERR > GRAPHICS & DESIGN > </span>
        <h1>AI Artists</h1>

        <p>
          Explore the boundaries of art and technology with FIverr's AI Artists
        </p>

        <div className="menu">
          <div className="left">
            <span>Buged</span>
            <input type="text" placeholder='min' />
            <input type="text" placeholder='max' />
            <button>Apply</button>
          </div>

          <div className="right">
            <span className='sortBy'>Sort By</span>
            <span className='sortType'>{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img src={downIcon} alt='' onClick={() => setOpen(!open)}/>

            {open && (
              <div className="rightMenu">
              <span onClick={() => resort('createdAt')}>Newest</span>
              <span onClick={() => resort('sales')}>Best Selling</span>
            </div>
            )}
          </div>
        </div>


      <div className='cards'>
        {gigs.map((item,index) => {
          return(
            <>
            <GIgCard item={item} key={item.id}/>
            </>
          )
        })}
      </div>

      </div>
    </div>
  )
}

export default Gigs