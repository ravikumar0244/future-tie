import React from "react";
import "./App.css";
import StudentLogin from "./Components/Login/StudentLogin/StudentLogin";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import StudentRegister from "./Components/Register/StudentRegister/StudentRegister";
import StudentDashBoard from "./Components/Dashboard/StudentDashBoard";
import AgentDashboard from "./Components/AgentDashboard/AgentDashboard";
import AgentRegister from "./Components/AgentDashboard/AgentRegister/AgentRegister";
import AgentLogin from "./Components/AgentDashboard/AgentLogin/AgentLogin";
import { Error } from "./Components/Error/error";

class App extends React.Component {
  render() {
    return (
      <div className="m-0 container-fluid p-0">
        <Router>
          <Switch>
            <Route path="/student/login" component={StudentLogin} />
            <Route path="/student/register" component={StudentRegister} />
            <Route path="/agent/register" component={AgentRegister} />
            <Route path="/agent/login" component={AgentLogin} />
            <Route path="/student" component={StudentDashBoard} />
            <Route path="/agent" component={AgentDashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
