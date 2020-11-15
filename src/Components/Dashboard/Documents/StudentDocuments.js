import { firestore } from "firebase";
import React, { Component } from "react";
import "./styles.doc.css";
import { auth, storage } from "../../../firebase/config";

export default class StudentDocuments extends Component {
  constructor() {
    super();
    this.state = {
      user: auth.currentUser,
      loading: true,
      userImagesUrl: {},
      user_doc: null,
      user_documents_details: null,
    };
  }
  getDocumentDetils = async () => {
    const data = firestore()
      .collection("students")
      .doc(this.state.user.uid)
      .collection("profileDetails")
      .doc("documents")
      .get()
      .then((doc) => {
        console.log(doc.data());
        console.log(Object.keys(doc.data()).length);
        if (Object.keys(doc.data()).length === 0) {
          console.log("INSIDE IF BLOCK");
          this.setState({ user_documents_details: null, loading: false });
          return null;
        } else {
          console.log("INSIDE ELSE BLOCK");

          this.setState({ user_documents_details: doc.data(), loading: false });
          return doc.data();
        }
      });
    return await data;
  };
  componentDidMount() {
    if (!this.state.user) return;
    firestore()
      .collection("students")
      .doc(this.state.user.uid)
      .collection("profileDetails")
      .doc("details")
      .get()
      .then((doc) => {
        const doc_data = doc.data();
        this.setState({ user_doc: doc_data });
      })
      .then(this.getDocumentDetils());
  }

  storageHandler = (name, file) => {
    if (!file) return false;
    storage
      .ref(`/userImages/${this.state.user.uid}/`)
      .listAll()
      .catch((e) => console.log(e))
      .then((lst) => {
        if (lst.length === 0) return false;
        lst.items.forEach((file) => file.delete());
      })
      .then(() => {
        const task = storage
          .ref(`/userImages/${this.state.user.uid}/${file.name}`)
          .put(file);
        task.on(
          "state_changed",
          (ss) => {
            console.log(ss);
          },
          (err) => {
            console.log(err);
            this.setState({ loading: false });
          },
          () => {
            const doc = storage.ref(
              `userImages/${this.state.user.uid}/${file.name}`
            );
            doc
              .getDownloadURL()
              .then((url) => {
                this.setState((s) => ({
                  userImagesUrl: {
                    ...s.userImagesUrl,
                    [name]: url,
                  },
                }));
              })
              .then(() => {
                firestore()
                  .collection("students")
                  .doc(this.state.user.uid)
                  .collection("profileDetails")
                  .doc("documents")
                  .set({
                    ...this.state.userImagesUrl,
                  })
                  .then(() => {
                    this.getDocumentDetils();
                  })
                  .then(this.setState({ loading: false }));
              })
              .catch((e) => {
                console.log(e);
                this.setState({ loading: false });
              });
          }
        );
      });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true }, () => {
      this.storageHandler("education_certificate", this.state.edu_certif);
    });
  };
  handleChange = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const name = e.target.name;
    this.setState(() => ({
      [name]: image,
    }));
  };
  delDoc = async (e) => {
    e.preventDefault();
    this.setState({ user_documents_details: null });
    this.storageHandler();
  };
  render() {
    if (this.state.loading) {
      return <div className="spinner-grow my-5 mx-auto text-primary"></div>;
    }
    if (this.state.user_documents_details) {
      return (
        <div className="container">
          <h1>Check Your Documents</h1>
          <div className="row p-3">
            <div className="col">
              {this.state.user_doc.h_education} Document:
            </div>
            <div className="col">
              <a
                className=""
                href={this.state.user_documents_details.education_certificate}
              >
                See The Document Here
              </a>
            </div>
            <div className="col">
              <button className="btn btn-danger" onClick={this.delDoc}>
                {this.state.loading ? (
                  <div className="spinner-border"></div>
                ) : (
                  "DEL"
                )}
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="scontainer m-0 px-5 py-1">
          <form className="row" onSubmit={this.handleSubmit}>
            <div className="col-12 col-md-6">
              <div className={`form-group text-left p-2`}>
                <label htmlFor="10_c" className="">
                  Highest Education Certificate
                </label>
                <input
                  type="file"
                  required
                  className="form-control-file"
                  id="10_c"
                  style={{
                    textTransform: "capitalize",
                  }}
                  name="edu_certif"
                  accept=".pdf"
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="home-button"
                disabled={this.state.loading}
              >
                {this.state.loading ? (
                  <div className="spinner-border"></div>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
}
