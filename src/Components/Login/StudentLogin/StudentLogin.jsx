import React, { Component } from "react";
import "./StudentLogin.css";
import { signIn_Google, auth } from "../../../firebase/config";
import { Redirect } from "react-router-dom";
import { firestore } from "firebase";
class StudentLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
      this.props.history.push("/student");
    } catch (e) {
      this.setState({ loading: false, error: e.message });
    }
  };
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
            console.log("DOCUMENT EXISTS");
            this.setState({ user: u, loading: false });
            this.props.history.push("/student");
          } else {
            this.setState({ user: null, loading: false });
          }
        });
    });
  }
  render() {
    if (this.state.user) {
      return <Redirect to="/student"></Redirect>;
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
        <div className="form ml-lg-5">
          <div className="row justify-content-around mt-3">
            <h1 className="">Student Login</h1>
            <button
              className="register-btn btn px-4"
              onClick={() => {
                this.props.history.push("/student/register");
              }}
            >
              Register
            </button>
          </div>
          <hr className="mb-0 w-100" />
          <form onSubmit={this.onSubmit}>
            <div className="mx-auto my-3 input-field ">
              <input
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                name="email"
                required
                autoComplete="off"
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
            {this.state.error ? (
              <div className="err">{this.state.error}</div>
            ) : (
              ""
            )}
            <div className="btn-container col-12 mb-3">
              <div className="row justify-content-center">
                <button
                  className="submit-button p-2 mx-1 col"
                  type="submit"
                  disabled={this.state.loading}
                >
                  {this.state.loading ? (
                    <div className="spinner-border"></div>
                  ) : (
                    "Submit"
                  )}
                </button>
                <button
                  className="submit-button p-2 col mx-1"
                  onClick={() => {
                    signIn_Google();
                    this.props.history.push("/student");
                  }}
                >
                  Login With Google
                </button>
              </div>
              <div className="row my-2 justify-content-center border p-1">
                <button
                  className="submit-button col-5 mx-5 p-2"
                  onClick={() => {
                    this.props.history.push("/agent/login");
                  }}
                >
                  Agent Login
                </button>
              </div>
            </div>
          </form>
          <div className="text-center container"></div>
        </div>
      </div>
    );
  }
}

export default StudentLogin;
