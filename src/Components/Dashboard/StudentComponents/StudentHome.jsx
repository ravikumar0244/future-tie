import React, { Component } from "react";
import one from "../../../Img/StudentHome/01.png";
import two from "../../../Img/StudentHome/02.png";
import three from "../../../Img/StudentHome/03.png";
import four from "../../../Img/StudentHome/04.png";
import five from "../../../Img/StudentHome/05.png";

import "./studentComponents.css";
class StudentHome extends Component {
  render() {
    return (
      <div className="container-fluid main-dashboard m-0 p-0 ">
        <h1 className="text-dark p-3">How It Works</h1>
        <div className="container-fluid m-0 p-0 middle-panel">
          <div className="c_container row m-0 p-0">
            <div className="col-12 col-md item_c">
              <img src={one} alt="find" />
              <h3>Find School</h3>
            </div>
            <div className="col-12 col-md item_c">
              <img src={two} alt="accepted" />
              <h3>Apply</h3>
            </div>
            <div className="col-12 col-md item_c">
              <img src={three} alt="submit" />
              <h3>Get Accepted</h3>
            </div>
            <div className="col-12 col-md item_c">
              <img src={four} alt="submit" />
              <h3>Visa Process</h3>
            </div>
            <div className="col-12 col-md item_c">
              <img src={five} alt="submit" />
              <h3>Book Flight</h3>
            </div>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-6 text-center">
            <button className="home-button">Search A Program</button>
          </div>
          <div className="col-6 text-center">
            <button className="home-button">Complete Your Profile</button>
          </div>
        </div>
        <div className="row m-0 main-dashboard p-0">
          <div className="col-12 m-0 p-0 py-2 contact-us text-left">
            <h2 className="p-2 h2 text-center">Contact Us</h2>
            <div className="jumbotron container text-center">
              Contact Details Here
            </div>
            <div className="jumbotron container text-center">
              Contact Details Here
            </div>
            <div className="jumbotron container text-center">
              Contact Details Here
            </div>
            <div className="jumbotron container text-center">
              Contact Details Here
            </div>
            <div className="jumbotron container text-center">
              Contact Details Here
            </div>
            <div className="jumbotron container text-center">
              Contact Details Here
            </div>
            <h1>Hello</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentHome;
