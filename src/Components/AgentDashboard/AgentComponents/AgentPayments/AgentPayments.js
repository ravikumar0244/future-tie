import { firestore } from "firebase";
import React from "react";
import { auth } from "../../../../firebase/config";
import {} from "./../../../../firebase/config";
export class AgentPayments extends React.Component {
  state = {
    payment_docs: null,
  };
  componentDidMount() {
    this.getPayments().then((docs) => {
      if (!docs) return;
      let data = docs.map((doc) => doc.data());
      this.setState({ payment_docs: data });
    });
  }
  getPayments = () =>
    new Promise((response, reject) => {
      firestore()
        .collection("Agents")
        .doc(auth.currentUser.uid)
        .collection("Payments")
        .get()
        .then((docs) => {
          if (docs.empty) {
            response(null);
            return;
          }
          response(docs.docs);
          return;
        })
        .catch((e) => reject(e));
    });
  StudentPayments = ({ data }) => {
    return (
      <li
        className="list-group-item d-flex align-items-center bd-highlight"
        style={{ flexWrap: "wrap" }}
      >
        <span className="p-0 my-0 mx-1">
          <p className="text-dark m-0 p-0 h3">{data.student_name}</p>
          <span className="text-dark">{data.student_email}</span>
        </span>
        <span className="p-0 my-0 mx-1 flex-grow-0 flex-sm-grow-1">
          <hr />
        </span>
        <div
          className="p-0 my-0 mx-1 text-dark text-right sm-w-100"
          style={{ right: "0" }}
        >
          <span className="text-success font-weight-bold">
            +{data.payment.amount}{" "}
          </span>
          On {data.payment.date}
        </div>
      </li>
    );
  };
  render() {
    return (
      <>
        <h1>Agent Payments</h1>
        <div className="container-fluid mx-0 my-1 p-0">
          <div className="row my-2 mx-0 p-0 text-left justify-content-center flex-wrap">
            <div className="col-8">
              <div className="paymentCard p-2 bg-light">
                <div className="payments">
                  <ul className="list-group">
                    {this.state.payment_docs
                      ? this.state.payment_docs.map((doc, i) => {
                          return <this.StudentPayments data={doc} key={i} />;
                        })
                      : null}
                    <li
                      className="list-group-item d-flex align-items-center bd-highlight"
                      style={{ flexWrap: "wrap" }}
                    >
                      <span className="p-0 my-0 mx-1">
                        <p className="text-dark m-0 p-0 h3">Some One</p>
                        <span className="text-dark">someone123@ss.com</span>
                      </span>
                      <span className="p-0 my-0 mx-1 flex-grow-0 flex-sm-grow-1">
                        <hr />
                      </span>
                      <div
                        className="p-0 my-0 mx-1 text-dark text-right sm-w-100"
                        style={{ right: "0" }}
                      >
                        <span className="text-success font-weight-bold">
                          +20{" "}
                        </span>
                        On 20/10/20
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
