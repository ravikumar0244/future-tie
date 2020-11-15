import { firestore } from "firebase";
import React from "react";
import Switch from "react-bootstrap/esm/Switch";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import { auth } from "../../firebase/config";
import AgentHeader from "./AgentHeader/agentHeader";
import LeftMenu from "./LeftMenu/leftMenu";
import AgentHome from "./AgentComponents/AgentHome";
import AgentProfile from "./AgentComponents/AgentProfile/agentProfile";
import AgentApplication from "./AgentComponents/AgentApplication/AgentApplication";
import Schools from "../Dashboard/Schools/Schools";
import { Error } from "./../Error/error";
import MainForm from "../Dashboard/profileForm/profile-form/form";
import { AgentPayments } from "./AgentComponents/AgentPayments/AgentPayments";
export default class AgentDashboard extends React.Component {
  state = {
    user: null,
    loading: true,
    profileExist: false,
    error: { exist: false, msg: null },
  };
  componentDidMount() {
    auth.onAuthStateChanged(
      (u) => {
        if (!u) {
          this.setState({ user: null, loading: false });
          return;
        }
        const user = u;
        console.log(u);
        firestore()
          .collection("Agents")
          .doc(`${u.uid}`)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("DASHBOAR EXIST");
              this.checkAgentProfile(u);
              this.setState({ user: user });
            } else {
              this.setState({ user: null, loading: false });
            }
          })
          .catch((e) => {
            console.log("ERROR IN GET");
            console.log(e.message);
            this.setState(
              { error: { exist: true, msg: e.message }, loading: false },
              () => console.log(this.state)
            );
          });
      },
      (e) =>
        this.setState({
          error: { exist: true, msg: e.message },
          loading: false,
        })
    );
    console.log(this.state);
  }
  checkAgentProfile = (u) => {
    console.log("IN CHECKAGENT");
    firestore()
      .collection("Agents")
      .doc(`${u.uid}`)
      .collection("Profile")
      .doc("Details")
      .get()
      .then((doc) => {
        console.log(doc);
        if (!doc.exists) {
          console.log("DAHBOARD PROFILE NOT EXIXT");
          this.setState({ profileExist: false, loading: false });
          return;
        }
        let check = Object.keys(doc.data()).length;
        if (check > 0) {
          console.log("DAHBOARD PROFILE EXIXT");
          this.setState({ profileExist: true, loading: false });
          return;
        } else {
          console.log("DAHBOARD PROFILE NOT EXIXT");
          this.setState({ profileExist: false, loading: false });
          return;
        }
      })
      .catch((e) => {
        this.setState({
          error: { exist: true, msg: e.message },
          loading: false,
        });
      });
  };
  logout = () => {
    auth.signOut().then(
      (success) => {
        this.props.history.push("/agent/login");
      },
      (err) => {
        console.log(err, "error");
      }
    );
  };
  toggleMenu = () => {
    const e = document.getElementById("agent-left-menu");
    e.classList.remove("show-left-menu");
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="text-center p-5">
          <div className="spinner-grow text-primary text-center m-auto"></div>
        </div>
      );
    }
    if (!this.state.user) {
      return <Redirect to="/agent/login" />;
    }
    if (this.state.error.exist) {
      console.log("ERROR EXIST");
      return <Error msg={this.state.error.msg} />;
    }

    return (
      <div className="student-background m-0 p-0">
        <AgentHeader history={this.props.history} />
        <div className=" row m-0 p-0" onClick={(e) => this.toggleMenu()}>
          <Router>
            <LeftMenu history={this.props.history} />
            <div className="col-12 col-md-11 offset-md-1 p-0 m-0 text-center main-menu">
              <Switch className="m-0 p-0">
                <Route exact path={this.props.match.path}>
                  <AgentHome profile={this.state.profileExist} />
                </Route>
                <Route path={"/agent/profile"} component={AgentProfile} />
                <Route path={"/agent/payments"} component={AgentPayments} />

                <Route path={"/agent/schools"} component={Schools} />
                <Route path={"/agent/newStudent"}>
                  <MainForm
                    agentSubmit
                    handleAgentSubmit={this.formHandle}
                    profile={this.state.profileExist}
                  />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}
