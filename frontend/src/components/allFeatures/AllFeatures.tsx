import React from 'react'
import { features } from './featureData'
import video from "../../assets/img/video.mp4"
import checkImage from "../../assets/img/check.png"
import "./AllFeatutres.scss"

function AllFeatures() {
  return (
    <div className='allFeatures'>
        <div className="container">
            <div className='left'>
                <h1>A whole world of freelance talent at your fingertips</h1>

                {features.map((item,index) => {
                    return (
                        <>
                        <div className='title'>
                            <img src={checkImage} alt=""/>
                            {item.title}
                        </div>

                        <p>{item.description}</p>
                        </>
                    )
                })}
            </div>

            <div className="right">
                <video src={video} controls> </video>
            </div>
        </div>
    </div>
  )
}

export default AllFeatures