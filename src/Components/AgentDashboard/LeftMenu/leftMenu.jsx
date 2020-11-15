import React, { Component } from "react";
import home from "../../../Img/Menu Icons/Home Icon-03.png";
import application from "../../../Img/Menu Icons/Application Icon-04.png";
import profile from "../../../Img/Menu Icons/Profile Icon-01.png";
import university from "../../../Img/Menu Icons/School Icon-02.png";
import search from "../../../Img/Menu Icons/Search Icon-05.png";

import { NavLink } from "react-router-dom";

class StudentLeftMenu extends Component {
  expandBar = () => {};

  render() {
    return (
      <div className="col-md-1 m-0 p-0 bg-custom">
        <div id="agent-left-menu" className="text-left left-menu">
          <div className="icon-holder">
            <NavLink
              to="/agent"
              activeClassName="active-link"
              exact
              className="nav-link"
            >
              <img src={home} className="icon" alt="home" />
              <label>Home</label>
            </NavLink>
          </div>

          <div className="icon-holder">
            <NavLink
              to="/agent/profile"
              activeClassName="active-link"
              className="nav-link"
            >
              <img src={profile} className="icon" alt="home" />
              <label>Profile</label>
            </NavLink>
          </div>
          <div className="icon-holder">
            <NavLink
              to="/agent/schools"
              activeClassName="active-link"
              className="nav-link"
            >
              <img src={university} className="icon" alt="home" />
              <label>University</label>
            </NavLink>
          </div>
          <div className="icon-holder">
            <NavLink
              to="/agent/newStudent"
              activeClassName="active-link"
              className="nav-link"
            >
              <img src={application} className="icon" alt="home" />
              <label>Application</label>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
export default StudentLeftMenu;
