import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import startImage from "../../assets/img/star.png";
import heart from "../../assets/img/heart.png";

interface gigInterface {
  img: string;
  pp: string;
  username: string;
  desc: string;
  star: number;
  price: number;
}

function GIgCard({ item }: { item: gigInterface }) {
  return (
    <Link to="/gig/123" className="link">
      <div className="gigCard">
        <img src={item.img} alt="" />
        <div className="info">
          <div className="user">
            <img src={item.pp} alt="" />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>

          <div className="star">
            <img src={startImage} alt="" />

            <span>{item.star}</span>
          </div>
        </div>

        <hr />

        <div className="details">
          <img src={heart} alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>${item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GIgCard;
