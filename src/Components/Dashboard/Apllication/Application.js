import { firestore } from "firebase";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/config";

export default class Application extends React.Component {
  state = {
    profileVerified: false,
    docVerified: false,
    user: auth.currentUser,
    loading: true,
  };
  checkProfile = () => {
    if (!this.state.user) return;
    firestore()
      .collection("students")
      .doc(this.state.user.uid)
      .collection("profileDetails")
      .doc("details")
      .get()
      .then((doc) => doc.data())
      .then((data) => {
        if (Object.keys(data).length === 0) {
          this.setState({ profileVerified: false });
        } else {
          this.setState({ profileVerified: true });
        }
      });
  };
  checkDoc = () => {
    if (!this.state.user) return;
    firestore()
      .collection("students")
      .doc(this.state.user.uid)
      .collection("profileDetails")
      .doc("documents")
      .get()
      .then((doc) => doc.data())
      .then((data) => {
        if (Object.keys(data).length === 0) {
          this.setState({ docVerified: false });
        } else {
          this.setState({ docVerified: true });
        }
      });
  };
  addApplication = () => {
    if (!this.state.user) return;
    this.setState({ btnLoading: true });
    firestore()
      .collection("Applications")
      .doc(`${this.state.user.uid}`)
      .set({
        userId: this.state.user.uid,
        agent: {
          byAgent: false,
          agentID: null,
        },
        date: new Date().toISOString(),
        status: "Pending For Review",
      });
  };
  componentDidMount() {
    this.checkDoc();
    this.checkProfile();
    this.checkApplication();
  }
  checkApplication = () => {
    if (!this.state.user) return;
    firestore()
      .collection("Applications")
      .doc(`${this.state.user.uid}`)
      .get()
      .then((doc) => {
        if (doc.data()) {
          this.setState({ applicationExist: true, loading: false });
        } else {
          this.setState({ applicationExist: false, loading: false });
        }
      });
  };
  handleClick = (e) => {
    e.preventDefault();
    this.checkProfile();
    this.checkDoc();
    this.addApplication();
    this.checkApplication();
  };
  render() {
    if (this.state.loading) {
      return <div className="spinner-grow mt-5 text-primary"></div>;
    }
    if (this.state.applicationExist) {
      return (
        <div className="container-fluid">
          <h1>Application Submitted</h1>
        </div>
      );
    } else {
      return (
        <div className="container-fluid m-0 p-0">
          <h1 className="p-3 m-0">Submit Your Application</h1>
          {!this.state.profileVerified ? (
            <h4 className="p-1 m-0 text-danger">
              Please Check Your{" "}
              <Link to="/student/profile" className="h5">
                Profile
              </Link>
            </h4>
          ) : null}
          {!this.state.docVerified ? (
            <h4 className="p-1 m-0 mb-1 text-danger">
              Please Submit Your{" "}
              <Link to="/student/profile" className="h5">
                Documents
              </Link>{" "}
              Before Applying
            </h4>
          ) : null}
          {this.state.docVerified && this.state.profileVerified ? (
            <h4>
              Please Review Your Details Before Applying{" "}
              <Link to="/student/profile" className="h5">
                Here
              </Link>
            </h4>
          ) : null}
          <button
            onClick={this.handleClick}
            className="home-button mt-3"
            disabled={
              (!this.state.profileVerified && !this.state.docVerified) ||
              this.state.btnLoading
            }
          >
            {this.state.btnLoading ? (
              <div className="spinner-border"></div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      );
    }
  }
}
