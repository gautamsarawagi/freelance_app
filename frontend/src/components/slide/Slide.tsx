import React, { ReactNode } from "react";
import Slider from "infinite-react-carousel";
import "./Slide.scss";

import { cards } from "../../data";
import CategoryCard from "../categoryCard/CategoryCard";

function Slide({
  slidesToShow,
  arrowScroll,
  children,
}: {
  slidesToShow: number;
  arrowScroll: number;
  children: ReactNode;
}) {
  return (
    <div className="slide">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowScroll={arrowScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
}

export default Slide;
