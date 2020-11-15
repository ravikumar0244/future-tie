import { firestore } from "firebase";
import React, { Component } from "react";
import { FilterForm } from "./FilterForm";

export default class Schools extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      schools: null,
      originalSchool: null,
    };
  }

  componentDidMount() {
    firestore()
      .collection("Colleges")
      .doc("Details")
      .get()
      .then(async (res) => {
        this.setState({
          schools: await Object.values(res.data()),
          originalSchool: await Object.values(res.data()),
          loading: false,
        });
      });
  }

  locationFilter = (location) => {
    //console.log("Entered In location");
    if (location === "") {
      this.setState(
        { schools: this.state.originalSchool },
        () => {}
        //console.log("No Location Filter")
      );
      return;
    }
    var filtered = [];
    this.state.originalSchool.map((school) => {
      var t = school.courses.filter((course) => {
        return course.location.values.includes(location);
      });
      if (t.length !== 0) {
        var s = {
          ...school,
          courses: t,
        };
        filtered.push(s);
      }
      return true;
    });
    //console.log("filtered In location");
    this.setState(
      {
        schools: filtered,
      },
      () => {} //console.log("filtered - added")
    );
    return;
  };

  annualFeesFilter = (fees) => {
    //console.log("Entered In fees");
    if (fees === "") {
      return;
    }
    //console.log(this.state.schools);
    var filtered = [];
    this.state.schools.map((school) => {
      var t = school.courses.filter((course) => {
        return course.annualFees <= fees;
      });
      if (t.length !== 0) {
        var s = {
          ...school,
          courses: t,
        };
        filtered.push(s);
      }
      return true;
    });
    //console.log(filtered);
    //console.log("filtered In fees");
    this.setState({
      schools: filtered,
    });
    return;
  };

  ieltsFilter = (ielts) => {
    console.log("IN IELTS FILTER");
    if (ielts === "") return;
    var filtered = [];
    this.state.schools.map((school) => {
      var t = school.courses.filter((course) => {
        return course.req_ielts <= ielts;
      });
      if (t.length !== 0) {
        var s = {
          ...school,
          courses: t,
        };
        filtered.push(s);
      }
      return true;
    });
    this.setState({
      schools: filtered,
    });
    return;
  };
  collegeFilter = (college) => {
    console.log("IN COLLEGE FILTER");
    if (college === "") return;
    var filtered = this.state.schools.filter((school) => {
      return school.name.toLowerCase().includes(college.toLowerCase());
    });
    this.setState({
      schools: filtered,
    });
    return;
  };
  courseFilter = (courseName) => {
    if (courseName === "") return;
    var filtered = [];
    this.state.schools.map((school) => {
      var t = school.courses.filter((course) => {
        return course.name.toLowerCase().includes(courseName);
      });
      if (t.length !== 0) {
        var s = {
          ...school,
          courses: t,
        };
        filtered.push(s);
      }
      return true;
    });
    this.setState({
      schools: filtered,
    });
    return;
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let loc = e.target.elements.location.value;
    let fees = e.target.elements.fees.value;
    let ielts = e.target.elements.ielts.value;
    let college = e.target.elements.college.value;
    let courseName = e.target.elements.course.value;
    this.setState({
      loading: true,
    });
    await this.locationFilter(loc);
    await this.annualFeesFilter(fees);
    await this.ieltsFilter(ielts);
    await this.collegeFilter(college);
    await this.courseFilter(courseName);
    this.setState({
      loading: false,
    });
  };
  render() {
    if (this.state.loading) {
      return <div className="m-5 text-primary spinner-grow" />;
    } else {
      return (
        <div className="container-fluid m-0 p-0 text-center schools">
          <div className="col-12 p-2">
            <h1>Schools</h1>
          </div>

          <FilterForm
            submitHandler={this.handleSubmit}
            clearFunc={() =>
              this.setState((s) => ({ schools: s.originalSchool }))
            }
          />
          {this.state.schools.map((school) => {
            return school.courses.map((course, index) => {
              return (
                <div
                  key={index}
                  className="row border-bottom border-dark p-0 my-2 container w-75 mx-auto"
                >
                  <div className="col-12 m-0 row">
                    <div className="col-12 row">
                      <h2 className="col-6 text-left">Course: {course.name}</h2>
                      <h2 className="col-6 text-right">{school.name}</h2>
                    </div>
                    <div className="col-12 row text-left">
                      <h3 className="col-3">Apply Criteria:</h3>
                      <div className="col">
                        IELTS score- Overall {course.req_ielts}, Minimum{" "}
                        {course.min_ielts} required
                        <br />
                        {course.req_PTE ? (
                          <>
                            PTE score- Overall {course.req_PTE}, Minimum{" "}
                            {course.min_PTE} required
                          </>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 text-left">
                      <b>Annual Fees: </b>${course.annualFees}
                    </div>
                    <h3 className="col mt-2 font-weight-normal text-left">
                      <p>
                        <b>Locations:</b> {course.location.values.join(", ")}
                      </p>
                    </h3>
                  </div>
                </div>
              );
            });
          })}
          <div className="row">
            <div className="col-4"></div>
          </div>
        </div>
      );
    }
  }
}
