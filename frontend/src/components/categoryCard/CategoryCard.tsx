import React from "react";
import "./CategoryCard.scss";
import { Link } from "react-router-dom";

interface itemInterface {
    img: string,
    desc: string,
    title: string
}

function CategoryCard({ item } : {item: itemInterface}) {
  return (
    <Link to="/gigs?cat=design">
      <div className="categoryCard">
        <img src={item.img}/>
        <span className="description">{item.desc}</span>
        <span className="title">{item.title}</span>

      </div>
    </Link>
  );
}

export default CategoryCard;
