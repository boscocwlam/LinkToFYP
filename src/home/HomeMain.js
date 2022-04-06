import React from "react";
import HomeNav from "./HomeNav";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import pic from "../pic.jpeg";
import pic2 from "../pic2.jpeg";
import back1 from "../back1.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const HomeMain = () => {
  localStorage.clear();
  return (
    <div>
      <div>
        <HomeNav />
        {/* <h1>HomeMain</h1> */}
      </div>

      <div>
        <Carousel variant="dark">
          <Carousel.Item>
            <img className="photo1" src={pic} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="photo1" src={pic2} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
        <div className="mt-4"></div>
        <Container>
          <div className="row ">
            <div className="mt-4"></div>
            <h2 className="title90 centerObject">
              LinkToFYP ----- The first-ever Final Year Project-based job
              searching platform
            </h2>
            <div className="mt-2"></div>
            <h5 className="title90 centerObject">
              LinkToFYP is a Final Year Project (FYP) management and analysis
              platform for supporting multiple educational organizations. The
              system aimed to provide a convenient platform for employers to
              find suitable students via gaining more understanding about
              students’ ability via their FYPs. The system also hopes to help
              the staffs understand general employers’ preferences and students’
              ability by analysing the past data.
            </h5>
            <div className="mt-4"></div>
            {/* <div className="mt-4"></div>
            <h3 className="title90 centerObject">Our Belief</h3>
            <div className="mt-2"></div>
            <h5 className="title90 centerObject">
              LinkToFYP is a platofrm that reviews graduates’ FYP other than
              traditional job platform reviewing people’s resume as the major
              considering factor. The design is tailor-made for the case that
              the employers would find graduates via the School Department
              Staff. Both parties truly in the effect of education, and thus,
              recommending talented students with good academics. FYP is a good
              indicator to judge students’ ability and particular strength.
            </h5>
            <div className="mt-4"></div>
            <h3 className="title90 centerObject">
              What is Final Year Project?
            </h3>
            <div className="mt-2"></div>
            <h5 className="title90 centerObject">
              Final Year Project (FYP) is a project that must be accomplished
              individually by every undergraduate student to obtain the
              qualifications to graduate. In fact, FYP is a big step for
              students to learn as a practical experience. According to Uziak
              (2015), FYP allows students to apply tools and techniques in a
              real-world scenario, indicating the quality of students’ output
              and an intellectual commitment to a specific problem . This
              concludes that FYP could be a good indicator for employers to look
              through a student’s ability in a deeper way.
            </h5>
            <div className="mt-4"></div> */}
          </div>

          <img
            className="photo111 centerObject"
            src={back1}
            alt="Third slide"
          />
          <div className="mt-4"></div>
          <h3 className="title90 centerObject">What is Final Year Project?</h3>
          <div className="mt-4"></div>
          <h6 className="title90 centerObject">
            Final Year Project (FYP) is a project that must be accomplished
            individually by every undergraduate student to obtain the
            qualifications to graduate. In fact, FYP is a big step for students
            to learn as a practical experience. According to Uziak (2015), FYP
            allows students to apply tools and techniques in a real-world
            scenario, indicating the quality of students’ output and an
            intellectual commitment to a specific problem . This concludes that
            FYP could be a good indicator for employers to look through a
            student’s ability in a deeper way.
          </h6>
          <div className="mt-4"></div>
          <h3 className="title90 centerObject">Our Belief</h3>
          <div className="mt-4"></div>
          <h6 className="title90 centerObject">
            LinkToFYP is a platofrm that reviews graduates’ FYPs other than
            traditional job platform reviewing people’s resume as the major
            considering factor. The design is tailor-made for employers to find
            graduates via the School Department Staff. FYP is a good indicator
            to judge students’ ability and particular strength, and thus,
            recommending talented students with good academics.
          </h6>
        </Container>
      </div>
      <div className="mt-4"></div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="color-nav"
        variant="light"
      >
        <Container>
          <h6 className="tt6">
            CopyRight by Lam Chun Wing (Final Year Project)
          </h6>
          <div className="mt-1"></div>
          <h6 className="tt6">
            2021-2022
          </h6>
        </Container>
        <div className="mt-4"></div>
        <h1>

        </h1>
        <div className="mt-4"></div>
      </Navbar>
    </div>
  );
};

export default HomeMain;
