import { firestore } from "firebase";
import React from "react";
import { Redirect } from "react-router-dom";
import { auth, createAgent } from "../../../firebase/config";

export default class AgentRegister extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: {
        exist: false,
        er: null,
      },
      data: { agentEmail: "", agentName: "", agentpassword: "" },
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged(
      (u) => {
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
              this.setState({ user: null, loading: false });
            } else {
              this.setState({ user: u, loading: false });
            }
          })
          .catch((e) => {
            this.setState({
              error: {
                exist: true,
                er: e.message,
              },
              loading: false,
            });
          });
      },
      (e) => {
        this.setState({
          error: {
            exist: true,
            er: e.message,
          },
          loading: false,
        });
      }
    );
  }
  onChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState((s) => ({
      data: {
        ...s.data,
        [name]: value,
      },
    }));
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("CLICKED");
    this.setState({ btnLoading: true });
    try {
      const { email, password, displayName } = this.state.data;
      console.log(this.state);
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (u) => {
          console.log(u);
          await createAgent(u.user, displayName);
          this.setState({ user: u.user, btnLoading: false });
        });
    } catch (e) {
      console.log(e);
      this.setState({
        error: {
          exist: true,
          er: e.message,
          e: e,
        },
        btnLoading: false,
      });
    }
  };
  render() {
    if (this.state.user) {
      return <Redirect to="/agent"></Redirect>;
    }
    if (this.state.loading) {
      return (
        <>
          <div className="text-center">
            <div className="spinner-grow text-primary mt-5"></div>
          </div>
        </>
      );
    }
    return (
      <div className="heading">
        <div className="form m-auto ml-lg-5">
          <div className="row align-items-center m-0">
            <h1 className="col-8">Agent Register</h1>
            <button
              className="submit-button register-btn btn col-4"
              onClick={() => {
                this.props.history.push("/agent/login");
              }}
            >
              Login Instead?
            </button>
          </div>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <div className="mx-auto my-3 input-field">
              <input
                type="text"
                value={this.state.data.displayName}
                onChange={this.onChange}
                name="displayName"
                required
                id="displayName"
              />
              <label htmlFor="displayName">Full Name</label>
            </div>
            <div className="mx-auto my-3 input-field">
              <input
                type="email"
                value={this.state.data.email}
                onChange={this.onChange}
                name="email"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="mx-auto my-3 input-field">
              <input
                type="password"
                value={this.state.data.password}
                name="password"
                onChange={this.onChange}
                required
              />
              <label htmlFor="displayName">Password</label>
            </div>
            {this.state.error.exist ? (
              <h3 className="text-danger text-center m-0 py-2">
                {this.state.error.er}
              </h3>
            ) : null}

            <div className="btn-container row no-gutters m-0 text-center">
              <button
                className="submit-button m-auto"
                onClick={this.onSubmit}
                disabled={this.state.btnLoading}
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
