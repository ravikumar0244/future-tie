import React from "react";
import { firestore } from "firebase";
import { auth } from "../../../firebase/config";
import MainForm from "./profile-form/form";
import { DisplayDet } from "./display-details/displaydet";
import StudentDocuments from "../Documents/StudentDocuments";
import { ProfileHeader } from "./profileHeader/profileHeader";
import { Error } from "./../../Error/error";
class Profile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: auth.currentUser,
      loading: true,
      userProfile: null,
      error: { exist: false, msg: null },
      userDoc: null,
      exist: false,
      displayProfile: true,
    };
  }
  setfirebaseDoc = async (id, data) => {
    this.setState({
      loading: true,
    });
    await firestore()
      .collection("students")
      .doc(id)
      .collection("profileDetails")
      .doc("details")
      .set({ ...data, status: "pending" })
      .then((res) => {
        this.checkDoc_func();
      })
      .catch((e) => {
        this.setState({ error: { exist: true, msg: e.message } });
      });
  };

  setChange = (e) => {
    this.setState({
      userProfile: {
        ...this.state.userProfile,
        [e.target.name]: e.target.value,
      },
    });
  };
  checkDoc_func = () => {
    if (this.state.user) {
      firestore()
        .collection("students")
        .doc(this.state.user.uid)
        .collection("profileDetails")
        .doc("details")
        .get()
        .then((doc) => {
          let mainProfileData = doc.data();
          this.setState({ userDoc: doc.data() });
          if (Object.keys(mainProfileData).length > 10) {
            this.setState({
              userProfile: mainProfileData,
              exist: true,
              loading: false,
            });
          } else {
            this.setState({ loading: false, exist: false });
          }
        })
        .catch((e) => {
          this.setState({ error: { exist: true, msg: e.message } });
        });
    }
  };
  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all?fields=name;")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ countries: res });
      })
      .catch((e) => {
        this.setState({ error: { exist: true, msg: e.message } });
      });
    this.checkDoc_func();
  }
  toggleDisplayProfile = (v) => {
    this.setState((s) => ({
      displayProfile: v,
    }));
  };

  doesProfileExist = () => {
    if (this.state.exist) {
      return (
        <DisplayDet
          userDet={{
            Doc: this.state.userDoc,
            Profile: this.state.userProfile,
          }}
          handleEdit={() => this.setState({ exist: false })}
        />
      );
    } else {
      return (
        <MainForm
          countries={this.state.countries}
          userID={this.state.user.uid}
          setFunc={this.setfirebaseDoc}
          data={this.state.userProfile}
        />
      );
    }
  };

  render() {
    if (!this.state.user) {
      return null;
    } else {
      if (this.state.loading) {
        return <div className="spinner-grow text-primary my-5 mx-auto"></div>;
      }
      if (this.state.error.exist) {
        return <Error msg={this.state.error.msg} />;
      } else {
        return (
          <>
            <ProfileHeader handleClick={this.toggleDisplayProfile} />
            {this.state.displayProfile ? (
              this.doesProfileExist()
            ) : (
              <StudentDocuments />
            )}
          </>
        );
      }
    }
  }
}

export default Profile;
