import React from "react";
import "./Home.scss";
import Featutred from "../../components/featured/Featutred";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CategoryCard from "../../components/categoryCard/CategoryCard";

import { cards,projects } from "../../data";
import AllFeatures from "../../components/allFeatures/AllFeatures";
import checkImage from "../../assets/img/check.png";
import ProjectCard from "../../components/projectCard/ProjectCard";

function Home() {
  return (
    <div className="home">
      <Featutred />
      <TrustedBy />
      <Slide slidesToShow={5} arrowScroll={5}>
        {cards.map((item, index) => {
          return (
            <>
              <CategoryCard item={item} key={item.id} />
            </>
          );
        })}
      </Slide>

      <AllFeatures />

      <div className="homeBanner">
        <div className="container">
          <div className="left">
            <h1>A business solution <br/>designed for <i>teams</i></h1>

            <h2>
              Upgrade to a curated experience packed with tools <br/> and benefits,
              dedicated to <i>businesses</i>
            </h2>
            <div className="title">
              <img src={checkImage} alt="" />
              Connect to freelancers with proven business experience
            </div>

            <div className="title">
              <img src={checkImage} alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>

            <div className="title">
              <img src={checkImage} alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>

            <button>Explore Fiverr Buisness</button>
          </div>

          <div className="right">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <Slide slidesToShow={4} arrowScroll={4}>
        {projects.map((item, index) => {
          return (
            <>
              <ProjectCard item={item} key={item.id} />
            </>
          );
        })}
      </Slide>

    </div>
  );
}

export default Home;
