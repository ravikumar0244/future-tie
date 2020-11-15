import { firestore } from "firebase";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { DisplayDet } from "../../Dashboard/profileForm/display-details/displaydet";
import { Error } from "../../Error/error";
import { auth } from "./../../../firebase/config";
import { DisplayProfile } from "./AgentProfile/displayProfile";

export default class AgentHome extends React.Component {
  state = {
    userId: null,
    loading: true,
    applications: {
      pending: [],
      rejected: [],
      accepted: [],
    },
    student: {
      display: false,
      details: null,
    },
    error: {
      exist: false,
      msg: null,
    },
  };
  componentDidMount() {
    console.log(this.props);
    auth.onAuthStateChanged((u) => {
      if (!u) return;
      this.setState({ userId: u.uid });

      this.getAgentInfo(u.uid)
        .then((doc) => {
          this.setState({ docData: doc });
        })
        .then(() => {
          this.getStudents(u.uid).then((res) => {
            if (!res) {
              this.setState({ loading: false });
              return;
            }
            let pending_app = res.filter((item) => item.status === "pending");
            let accepted_app = res.filter((item) => item.status === "accepted");
            let rejected_app = res.filter((item) => item.status === "rejected");
            if (
              pending_app.length < 1 &&
              accepted_app.length < 1 &&
              rejected_app.length < 1
            ) {
              this.setState({
                applications: {
                  display: false,
                },
              });
              return;
            }
            this.setState({
              originalApplication: {
                pending: pending_app,
                accepted: accepted_app,
                rejected: rejected_app,
                display: true,
              },
              applications: {
                pending: pending_app,
                accepted: accepted_app,
                rejected: rejected_app,
                display: true,
              },
              loading: false,
            });
          });
        })
        .catch((e) => {
          this.setState({
            error: { exist: true, msg: e.message },
            loading: false,
          });
        });
    });
  }
  StudentCard = ({ data }) => {
    const { name, dob, id, email } = data;
    return (
      <div className="col-12 st-card border-bottom p-2 m-0">
        <h2>{name}</h2>
        <div className="d-flex justify-content-between align-items-bottom">
          <div>
            <h3 className="font-weight-light">DoB: {dob}</h3>
            <h3 className="font-weight-light">Email: {email}</h3>
          </div>
          <button
            className="btn btn-text-color"
            onClick={() => this.displayStudentDetails(id)}
          >
            Details
          </button>
        </div>
      </div>
    );
  };
  displayStudentDetails = (id) => {
    this.setState({ loading: true });
    firestore()
      .collection("students")
      .doc(id)
      .get()
      .then((doc) => {
        let data = doc.data();
        this.setState((s) => ({
          student: {
            ...s.student,
            display: true,
            details: data,
          },
          loading: false,
        }));
      })
      .catch((e) => {
        this.setState({
          error: { exist: true, msg: e.message },
          loading: false,
        });
      });

    return id;
  };
  getAgentInfo = (id) =>
    new Promise((res, rej) => {
      firestore()
        .collection("Agents")
        .doc(id)
        .get()
        .then((doc) => res(doc.data()))
        .catch((e) => rej(e));
    });
  getStudents = (id) =>
    new Promise((response, rej) => {
      firestore()
        .collection("Agents")
        .doc(id)
        .collection("Students")
        .get()
        .then((res) => {
          if (res.empty) {
            response(null);
            return;
          } else {
            let docs = res.docs;
            let data = docs.map((doc) => {
              return doc.data();
            });

            response(data);
          }
        })
        .catch((e) => rej(e));
    });
  handleCloseProfile = () => {
    this.setState({
      student: { display: false, details: null },
      applications: this.state.originalApplication,
    });
  };
  filterStudents = () => {
    this.setState({ applications: this.state.originalApplication }, () => {
      if (!this.state.emailQuery) {
        this.setState({ applications: this.state.originalApplication });
        return;
      }
      let sq = this.state.emailQuery.toLowerCase();
      console.log(this.state.applications);
      const { pending, accepted, rejected } = this.state.applications;
      let n_p = pending.filter((i) =>
        i.student_email.toLowerCase().includes(sq)
      );
      let n_a = accepted.filter((i) =>
        i.student_email.toLowerCase().includes(sq)
      );
      let n_r = rejected.filter((i) =>
        i.student_email.toLowerCase().includes(sq)
      );

      console.log(n_p);
      this.setState((s) => ({
        applications: {
          ...s.applications,
          pending: n_p,
          accepted: n_a,
          rejected: n_r,
        },
        emailQuery: "",
      }));
    });
  };
  render() {
    const { pending, accepted, rejected } = this.state.applications;
    if (this.state.loading) {
      return (
        <div className="text-center">
          <div className="spinner-grow m-5 text-primary"></div>
        </div>
      );
    }
    if (this.state.error.exist) {
      return <Error msg={this.state.error.message} />;
    }
    if (this.state.student.display) {
      return (
        <DisplayDet
          userDet={{ Profile: this.state.student.details, byAgent: true }}
          closeFunc={this.handleCloseProfile}
        />
      );
    }
    // if (!this.props.profile) {
    //   return <Redirect to="/agent/profile" />;
    // }
    return (
      <div className="container-fluid m-0 p-0 row">
        <div className="col-12 px-3 py-1 m-0 bg-light border-bottom">
          <div className="d-flex align-items-baseline justify-content-between">
            <h1 className="text-left">
              Hello {this.state.docData.displayName}
            </h1>
            <Link className="btn btn-primary btn-color" to="/agent/newStudent">
              Add New
            </Link>
          </div>
        </div>
        {!this.state.applications.display ? (
          <div className="text-center col-12">
            <h2 className="p-3 text-center">No Students</h2>
          </div>
        ) : (
          <>
            <div className="d-flex align-items-center my-2 col-12 ">
              <input
                className="form-control mr-1 col-11 col-md-5"
                onChange={(e) => this.setState({ emailQuery: e.target.value })}
                placeholder="Filter Students By Email"
                value={this.state.emailQuery}
                type="text"
              />
              <button
                className="btn btn-primary ml-1 btn-color col-1"
                onClick={this.filterStudents}
              >
                Filter
              </button>
            </div>
            <div className="col m-0 px-2 text-left ">
              <h1 className="col-heading">Pending</h1>
              <div className="students container-fluid row m-0 p-0">
                {pending.map((item, i) =>
                  item ? (
                    <this.StudentCard
                      data={{
                        name: item.student_name,
                        dob: item.student_dob,
                        id: item.student_id,
                        email: item.student_email,
                      }}
                      key={i}
                    />
                  ) : null
                )}
              </div>
            </div>
            <div className="col px-2 text-left border-left">
              <h1 className="col-heading">Accepted</h1>
              <div className="students container-fluid row m-0 p-0">
                {accepted.map((item, i) =>
                  item ? (
                    <this.StudentCard
                      data={{
                        name: item.student_name,
                        dob: item.student_dob,
                        id: item.student_id,
                      }}
                      key={i}
                    />
                  ) : null
                )}
              </div>
            </div>
            <div className="col px-2 py-1 text-left border-left ">
              <h1 className="col-heading">Rejected</h1>
              <div className="students container-fluid row m-0 p-0">
                {rejected.map((item, i) =>
                  item ? (
                    <this.StudentCard
                      data={{
                        name: item.student_name,
                        dob: item.student_dob,
                        id: item.student_id,
                      }}
                      key={i}
                    />
                  ) : null
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
