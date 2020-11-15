import { firestore } from "firebase";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { auth, agent_signIn_Google } from "../../../firebase/config";
import { Error } from "../../Error/error";
export default class AgentLogin extends Component {
  state = {
    user: null,
    loading: true,
    error: { exist: false },
    a_data: {
      email: "",
      password: "",
    },
  };
  usub = null;
  componentDidMount() {
    console.log("IN LOGIN");
    this.unsub = auth.onAuthStateChanged(
      (u) => {
        console.log("STATE CHANGED");
        console.log("IN AGENT LOGIN", u);
        if (!u) {
          this.setState({ user: null, loading: false });
          return;
        }
        firestore()
          .collection("Agents")
          .doc(`${u.uid}`)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              console.log("AGENT LOGIN, doc not found");
              this.setState({
                user: null,
                loading: false,
                btn_loading: false,
                a_data: {
                  email: "",
                  password: "",
                },
              });
            } else {
              console.log("AGENT LOGIN, doc found");

              this.setState({ user: u, loading: false });
            }
          })
          .catch((e) => {
            this.setState({
              loading: false,
              error: { exist: true, msg: e.message },
            });
          });
      },
      (e) => {
        this.setState({
          loading: false,
          error: { exist: true, msg: e.message },
        });
      }
    );
  }
  handleSubmit = (e) => {
    this.setState({ btn_loading: true });
    e.preventDefault();
    console.log("SUBMITTED");
    let { email, password } = this.state.a_data;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((u) => {
        firestore()
          .collection("Agents")
          .doc(`${u.uid}`)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("EXIST");
              this.setState({ user: u, loading: false });
            } else {
              console.log("NOT EXIST");
              this.setState({
                user: null,
                loading: false,
                error_lg: {
                  exist: true,
                  msg: "Please Register",
                },
                btn_loading: false,
                a_data: {
                  email: "",
                  password: "",
                },
              });
            }
          });
      })
      .catch((e) => {
        this.setState({
          error_lg: {
            exist: true,
            msg: e.message,
          },
          btn_loading: false,
          a_data: {
            email: "",
            password: "",
          },
        });
      });
  };
  handleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value;
    this.setState((s) => ({
      a_data: {
        ...s.a_data,
        [name]: val,
      },
    }));
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="text-center">
          <div className="spinner-grow mt-5 text-primary" />
        </div>
      );
    }
    if (this.state.user) {
      return <Redirect to="/agent" />;
    }
    if (this.state.error.exist) {
      return <Error msg={this.state.error.msg} />;
    }
    return (
      <div className="heading">
        <div className="form ml-lg-5">
          <div className="row justify-content-around mt-3">
            <h1 className="">Agent Login</h1>
            <button
              className="register-btn btn px-4"
              onClick={() => {
                this.props.history.push("/agent/register");
              }}
            >
              Register
            </button>
          </div>
          <hr className="mb-0 w-100" />
          <form onSubmit={this.handleSubmit}>
            <div className="mx-auto my-3 input-field ">
              <input
                type="email"
                value={this.state.a_data.email}
                onChange={this.handleChange}
                name="email"
                required
                autoComplete="off"
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="mx-auto my-3 input-field">
              <input
                type="password"
                value={this.state.a_data.password}
                name="password"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            {this.state.error_lg ? (
              <div className="text-center text-danger err">
                {this.state.error_lg.msg}
              </div>
            ) : null}
            <div className="btn-container text-center col-12 no-gutters mb-3">
              <div className="row">
                <button
                  className="submit-button col p-2  col mx-1"
                  type="submit"
                  disabled={this.state.btn_loading}
                >
                  {this.state.btn_loading ? (
                    <div className="spinner-border"></div>
                  ) : (
                    "Submit"
                  )}
                </button>
                <button
                  className="col submit-button p-2  col mx-1"
                  onClick={() => {
                    agent_signIn_Google()
                      .then((u) => {
                        console.log(u);
                      })
                      .catch((e) => {
                        this.setState({
                          error: { exist: true, msg: e.message },
                        });
                      });
                  }}
                >
                  Login With Google
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
