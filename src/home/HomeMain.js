import React from "react";
import HomeNav from "./HomeNav";
import bg1 from "../BG1.png";
import Carousel from "react-bootstrap/Carousel";
import logo1 from "../LinkToFYP_logo.png";
import logo2 from "../Picture2.png";
import logo3 from "../Picture3.png";

const HomeMain = () => {
  return (
    <div>
      <div>
        <HomeNav />
        {/* <h1>HomeMain</h1> */}
      </div>
      <div>

      <Carousel variant="dark">
        <Carousel.Item>
          <img className="photo1" src={logo1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="photo1" src={logo2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="photo1" src={logo3} alt="Third slide" />
        </Carousel.Item>
      </Carousel> 
      <div className="mt-4"></div>
     
      </div>
    </div>
  );
};

export default HomeMain;
