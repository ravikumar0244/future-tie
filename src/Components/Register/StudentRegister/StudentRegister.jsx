import React, { Component } from "react";
import "../../Login/StudentLogin/StudentLogin.css";

import { auth, createDoc } from "../../../firebase/config";
import { Redirect } from "react-router-dom";
import { firestore } from "firebase";

export default class StudentRegister extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      password: "",
      email: "",
      loading: true,
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged((u) => {
      if (!u) {
        this.setState({ user: null, loading: false });
        return;
      }
      console.log(this.state, "IN AUTH MAN");
      firestore()
        .collection("students")
        .doc(`${u.uid}`)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("EXIST");
            this.setState({ user: u, loading: false }, () => {
              console.log(this.state);
            });
          } else {
            console.log("NOT EXIST");
            this.setState({ user: null, loading: false });
          }
        });
    });
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { email, password, displayName } = this.state;

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      createDoc(user, { displayName });

      this.setState({
        displayName: "",
        password: "",
        email: "",
        loading: false,
      });
    } catch (e) {
      console.log(e);
      this.setState({ loading: false });
      alert(e.message);
    }
  };
  render() {
    if (this.state.user) {
      return <Redirect to="/student" />;
    }
    if (this.state.loading) {
      return (
        <div className="text-center p-5">
          <div className="spinner-grow text-primary text-center m-auto"></div>
        </div>
      );
    }
    return (
      <div className="heading">
        <div className="form m-auto ml-lg-5">
          <div className="row align-items-center m-0">
            <h1 className="col-8">Student Register</h1>
            <button
              className="submit-button register-btn btn col-4"
              onClick={() => {
                this.props.history.push("/student/login");
              }}
            >
              Login Instead?
            </button>
          </div>
          <hr />
          <form>
            <div className="mx-auto my-3 input-field">
              <input
                type="text"
                id="displayName"
                value={this.state.displayName}
                onChange={this.onChange}
                name="displayName"
                required
              />
              <label htmlFor="displayName">Full Name</label>
            </div>
            <div className="mx-auto my-3 input-field">
              <input
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                name="email"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="mx-auto my-3 input-field">
              <input
                type="password"
                value={this.state.password}
                name="password"
                onChange={this.onChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="btn-container row no-gutters m-0 text-center">
              <button
                className="submit-button m-auto"
                onClick={this.onSubmit}
                disabled={this.state.loading}
              >
                {this.state.loading ? (
                  <div className="spinner-border"></div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
