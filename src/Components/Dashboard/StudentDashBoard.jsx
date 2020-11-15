import React, { Component } from "react";
import { auth } from "../../firebase/config";
import StudentHeader from "./StudentHeader/StudentHeader";
import StudentLeftMenu from "./Menu/StudentLeftMenu";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import StudentHome from "./StudentComponents/StudentHome";
import Profile from "./profileForm/profile";
import Schools from "./Schools/Schools";
import Application from "./Apllication/Application";
import { firestore } from "firebase";
import { Error } from "../Error/error";

class StudentDashBoard extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: true,
      error: {
        exist: false,
        msg: null,
      },
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((u) => {
      if (!u) {
        this.setState({ user: null, loading: false });
        return;
      }
      firestore()
        .collection("students")
        .doc(`${u.uid}`)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.setState({ user: u, loading: false });
          } else {
            this.setState({ user: null, loading: false });
          }
        })
        .catch((e) => {
          this.setState({ error: { exist: true, msg: e.message } });
        });
    });
  }
  toggleMenu = () => {
    const e = document.getElementById("left-menu");
    e.classList.remove("show-left-menu");
  };
  render() {
    if (!this.state.user) {
      return <Redirect to="/student/login"></Redirect>;
    }
    if (this.state.error.exist) {
      return <Error msg={this.state.error.msg} />;
    }
    if (this.state.loading) {
      return (
        <div className="text-center">
          <div className="spinner-grow mt-5 text-primary"></div>
        </div>
      );
    }
    return (
      <div className="student-background m-0 p-0">
        <StudentHeader history={this.props.history} />
        <div className="row mt-0 m-0 p-0" onClick={(e) => this.toggleMenu()}>
          <Router>
            <StudentLeftMenu history={this.props.history} />
            <div
              id="main-menu"
              className="col-12 col-md-11 offset-md-1 p-0 m-0 text-center main-menu"
            >
              <Switch>
                <Route
                  exact
                  path={this.props.match.path}
                  component={StudentHome}
                />
                <Route path={"/student/profile"} component={Profile} />
                <Route path={"/student/schools"} component={Schools} />
                <Route path={"/student/application"} component={Application} />
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default StudentDashBoard;
