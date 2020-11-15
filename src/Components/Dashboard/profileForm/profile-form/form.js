import React from "react";
import "./form.css";
import { Form } from "react-bootstrap";
import IELTSform from "./e-exam/ielts";
import TOEFLform from "./e-exam/toefl";
import GREexam from "./e-exam/GREexam";
import GMATexam from "./e-exam/GMATexam";
import { firestore } from "firebase";
import { auth } from "../../../../firebase/config";
import { Redirect } from "react-router-dom";

class MainForm extends React.Component {
  state = {
    data: {
      firstName: "",
      middleName: "",
      sch_education: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
      firstLanguage: "",
      passportNumber: "",
      address: "",
      city_town: "",
      country: "",
      state: "",
      postal: "",
      email: "",
      mobileNumber: "",
      nationality: "",
      residency: "",
      education_c: "",
      h_education: "",
      visa: "",
      g_average: "",
      g_scheme: "",
      e_exam: "",
      IELTS: {
        writing: "",
        listening: "",
        reading: "",
        speaking: "",
        dateOfExam: "",
      },
      TOEFL: {
        writing: "",
        listening: "",
        reading: "",
        speaking: "",
        dateOfExam: "",
      },
      gre_exam: false,
      gre_details: {
        score_verbal: "",
        rank_verbal: "",
        score_quantitative: "",
        rank_quantitative: "",
        score_writing: "",
        rank_writing: "",
      },
      gmat_exam: false,
      gmat_details: {
        score_verbal: "",
        rank_verbal: "",
        score_quantitative: "",
        rank_quantitative: "",
        score_writing: "",
        rank_writing: "",
        gmat_total: "",
      },
      visaInfo: "",
      visaRefuse: "",
    },
    loading: false,
  };
  componentDidMount() {
    console.log();
    if (!this.props.data) return;
    console.log(this.props.data);
    this.setState({ data: { ...this.props.data } });
  }
  handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState((s) => ({
      data: {
        ...s.data,
        [name]: value,
      },
    }));
  };
  handleGREchange = (e) => {
    const { name, value } = e.target;
    this.setState((s) => ({
      data: {
        ...s.data,
        gre_details: {
          ...this.state.data.gre_details,
          [name]: value,
        },
      },
    }));
  };
  gmatHandle = (e) => {
    const { name, value } = e.target;
    this.setState((s) => ({
      data: {
        ...s.data,
        gmat_details: {
          ...this.state.data.gmat_details,
          [name]: value,
        },
      },
    }));
  };
  handleExamScoreValue = (e) => {
    const { name, value } = e.target;
    if (this.state.data.e_exam === "1") {
      this.setState((s) => ({
        data: {
          ...s.data,
          TOEFL: {
            writing: "",
            listening: "",
            reading: "",
            speaking: "",
            dateOfExam: "",
          },
          IELTS: {
            ...this.state.data.IELTS,
            [name]: value,
          },
        },
      }));
    }
    if (this.state.data.e_exam === "2") {
      this.setState((s) => ({
        data: {
          ...s.data,
          IELTS: {
            writing: "",
            listening: "",
            reading: "",
            speaking: "",
            dateOfExam: "",
          },
          TOEFL: {
            ...this.state.data.TOEFL,
            [name]: value,
          },
        },
      }));
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.setFunc(this.props.userID, this.state.data);
  };
  agentFormHandle = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    console.log("HANDLELING");
    let time = new Date().getTime();
    let stId = `${auth.currentUser.uid}_${time}`;
    firestore()
      .collection("students")
      .doc(stId)
      .set({
        ...this.state.data,
        status: "pending",
      });

    let st_name = `${this.state.data.firstName} ${
      this.state.data.middleName ? this.state.data.middleName : ""
    } ${this.state.data.lastName}`;

    console.log(st_name);

    firestore()
      .collection("Agents")
      .doc(auth.currentUser.uid)
      .collection("Students")
      .doc(stId)
      .set({
        student_id: stId,
        student_name: st_name,
        student_dob: this.state.data.dateOfBirth,
        created_at: new Date().toDateString(),
        status: "pending",
        student_email: this.state.data.email,
      })
      .then(() => {
        console.log("SUCCESS");
        this.setState({ success: true, loading: false });
      })
      .then(() => {
        this.setState({ redirect: true });
      });
  };
  render() {
    if (this.state.data.redirect) {
      return <Redirect to="/agent" />;
    }
    // if (!this.props.profile) {
    //   return <Redirect to="/agent/profile" />;
    // }
    return (
      <div className="m-0">
        <div className="form-container text-lg-left container-fluid">
          <form
            onSubmit={
              this.props.agentSubmit ? this.agentFormHandle : this.handleSubmit
            }
            className="row justify-content-center justify-content-lg-start mt-2"
          >
            <div className="col-12">
              <h2 className="mx-5 p-2 mb-3 border-bottom">Personal Details</h2>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="firstName" className="text-left">
                  First Name
                </label>
                <input
                  type="name"
                  // required
                  id="firstName"
                  onChange={this.handleInputChange}
                  value={this.state.data.firstName}
                  className="form-control p-3"
                  name="firstName"
                  placeholder="First Name"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="middleName" className="text-left">
                  Middle Name
                </label>
                <input
                  type="name"
                  // required
                  id="middleName"
                  onChange={this.handleInputChange}
                  value={this.state.data.middleName}
                  className="form-control p-3"
                  name="middleName"
                  placeholder="Middle Name"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="lastName" className="text-left">
                  Last Name
                </label>
                <input
                  type="name"
                  // required
                  id="lastName"
                  onChange={this.handleInputChange}
                  value={this.state.data.lastName}
                  className="form-control p-3"
                  name="lastName"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="dob" className="text-left">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  // required
                  id="dob"
                  style={{ textTransform: "uppercase" }}
                  onChange={this.handleInputChange}
                  value={this.state.data.dateOfBirth}
                  className="form-control p-3"
                  name="dateOfBirth"
                  placeholder="Date Of Birth"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <Form.Group>
                  <label htmlFor="gender">Gender</label>

                  <select
                    className="custom-select"
                    name="gender"
                    id="gender"
                    value={this.state.data.gender}
                    // required
                    onChange={this.handleInputChange}
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </Form.Group>
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <Form.Group>
                  <label htmlFor="maritalStatus">Marital Status</label>

                  <select
                    className="custom-select"
                    name="maritalStatus"
                    id="maritalStatus"
                    value={this.state.data.maritalStatus}
                    // required
                    onChange={this.handleInputChange}
                  >
                    <option value="">Marital Status</option>
                    <option value="married">Married</option>
                    <option value="single">Single</option>
                  </select>
                </Form.Group>
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="firstLanguage" className="text-left">
                  First Language
                </label>
                <input
                  type="name"
                  // required
                  id="firstLanguage"
                  onChange={this.handleInputChange}
                  value={this.state.data.firstLanguage}
                  className="form-control p-3"
                  name="firstLanguage"
                  placeholder="First Language"
                />
              </div>
            </div>

            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="passportNumber" className="text-left">
                  Passport Number
                </label>
                <input
                  type="name"
                  // required
                  id="passportNumber"
                  onChange={this.handleInputChange}
                  value={this.state.data.passportNumber}
                  className="form-control p-3"
                  name="passportNumber"
                  placeholder="Passport Number"
                />
              </div>
            </div>
            <div className="col-12">
              <h2 className="mx-5 p-2 mb-3 border-bottom">Address Details</h2>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="address" className="text-left">
                  Address
                </label>
                <input
                  type="text"
                  // required
                  id="address"
                  onChange={this.handleInputChange}
                  value={this.state.data.address}
                  className="form-control p-3"
                  name="address"
                  placeholder="Address"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="city+town" className="text-left">
                  City / Town
                </label>
                <input
                  type="text"
                  // required
                  id="city+town"
                  onChange={this.handleInputChange}
                  value={this.state.data.city_town}
                  className="form-control p-3"
                  name="city_town"
                  placeholder="City/Town"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="country" className="text-left">
                  Country
                </label>
                <select
                  id="country"
                  className="custom-select"
                  name="country"
                  value={this.state.data.country}
                  onChange={this.handleInputChange}
                  // required
                >
                  <option value="">Country</option>
                  {this.props.countries
                    ? this.props.countries.map((c) => (
                        <option value={c.name} key={c.name}>
                          {c.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="state" className="text-left">
                  State
                </label>
                <input
                  type="text"
                  // required
                  id="state"
                  onChange={this.handleInputChange}
                  value={this.state.data.state}
                  className="form-control p-3"
                  name="state"
                  placeholder="State"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="postal" className="text-left">
                  Postal Code
                </label>
                <input
                  type="text"
                  // required
                  id="postal"
                  onChange={this.handleInputChange}
                  value={this.state.data.postal}
                  className="form-control p-3"
                  name="postal"
                  placeholder="Postal/Zip Code"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="email" className="text-left">
                  Email
                </label>
                <input
                  type="email"
                  // required
                  id="email"
                  onChange={this.handleInputChange}
                  value={this.state.data.email}
                  className="form-control p-3"
                  name="email"
                  placeholder="Email Address"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="tele" className="text-left">
                  Phone Number
                </label>
                <input
                  type="tel"
                  // required
                  id="tele"
                  onChange={this.handleInputChange}
                  value={this.state.data.mobileNumber}
                  className="form-control p-3"
                  name="mobileNumber"
                  placeholder="Phone Number"
                  pattern="^[0-9-+\s()]*$"
                />
                <small className="form-text text-muted">
                  Enter Number With Country Code
                </small>
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 mx-auto">
                <label htmlFor="nationality">Nationality</label>
                <select
                  id="nationality"
                  className="custom-select"
                  name="nationality"
                  value={this.state.data.nationality}
                  onChange={this.handleInputChange}
                  // required
                >
                  {this.props.countries
                    ? this.props.countries.map((c) => (
                        <option value={c.name} key={c.name}>
                          {c.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 mx-auto">
                <Form.Group>
                  <label htmlFor="residency">Residency</label>

                  <input
                    className="form-control p-3"
                    type="text"
                    name="residency"
                    value={this.state.data.residency}
                    onChange={this.handleInputChange}
                    // required
                  ></input>
                </Form.Group>
              </div>
            </div>
            <div className="col-12">
              <h2 className="mx-5 p-2 mb-3 border-bottom">Education Details</h2>
            </div>
            <div className="form-group col-8 col-lg-6 ">
              <div className="w-75 m-auto">
                <Form.Group>
                  <label htmlFor="education_c">Country Of Education</label>

                  <select
                    className="custom-select"
                    name="education_c"
                    value={this.state.data.education_c}
                    onChange={this.handleInputChange}
                    // required
                  >
                    <option value="">Country Of Education</option>
                    {this.props.countries
                      ? this.props.countries.map((c) => (
                          <option value={c.name} key={c.name}>
                            {c.name}
                          </option>
                        ))
                      : null}
                  </select>
                </Form.Group>
              </div>
            </div>

            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <Form.Group>
                  <label htmlFor="h_educaion">Highest Education</label>
                  <Form.Control
                    id="h_educaion"
                    as="select"
                    size="md"
                    // required
                    onChange={this.handleInputChange}
                    name="h_education"
                    value={this.state.data.h_education}
                  >
                    <option value="">Highest Education</option>
                    <option value="under_grad">Under Graduate</option>
                    <option value="bachelor">Bachelor Degree</option>
                    <option value="post_grad">Post Graduate</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <Form.Group>
                  <label htmlFor="grade">Grading Scheme</label>
                  <Form.Control
                    onChange={this.handleInputChange}
                    id="grade"
                    as="select"
                    // required
                    size="md"
                    name="g_scheme"
                    value={this.state.data.g_scheme}
                  >
                    <option value="">Grading Scheme For Education</option>
                    <option value="other"></option>
                    <option value="Poly Technic Diploma">
                      Poly Technic Diploma
                    </option>
                    <option value="CBSE">CBSE</option>
                    <option value="State Board">State Board</option>
                    <option value="CISCE/ICSE">CISCE/ICSE</option>
                    <option value="West Bengal Board">West Bengal Board</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="g_average" className="text-left">
                  Average Grade
                </label>
                <input
                  type="number"
                  // required
                  id="g_average"
                  onChange={this.handleInputChange}
                  value={this.state.data.g_average}
                  className="form-control p-3"
                  name="g_average"
                  placeholder="Your Average Grades"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <Form.Group>
                  <label htmlFor="e-exam">English Exam</label>
                  <Form.Control
                    onChange={this.handleInputChange}
                    id="e-exam"
                    as="select"
                    size="md"
                    value={this.state.data.e_exam}
                    name="e_exam"
                  >
                    <option>English Exam Type</option>
                    <option value="1">IELTS</option>
                    <option value="2">TOEFL</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="w-75 m-auto">
                {this.state.data.e_exam === "1" ? (
                  <IELTSform
                    IELTS={this.state.data.IELTS}
                    handleExamScoreValue={this.handleExamScoreValue}
                  />
                ) : null}
                {this.state.data.e_exam === "2" ? (
                  <TOEFLform
                    TOEFL={this.state.data.TOEFL}
                    handleExamScoreValue={this.handleExamScoreValue}
                  />
                ) : null}
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <Form.Group>
                  <label htmlFor="visa">Visa</label>
                  <select
                    onChange={this.handleInputChange}
                    id="visa"
                    as="select"
                    size="md"
                    // required
                    name="visa"
                    value={this.state.data.visa}
                    className="browser-default custom-select"
                  >
                    <option value="">Do You Have a Visa?</option>
                    <option value="No Visa">No Visa</option>
                    <option value="USA F1 Visa">USA F1 Visa</option>
                    <option value="Canadian Study Visa/Visitor Visa">
                      Canadian Study Visa/Visitor Visa
                    </option>
                    <option value="UK Study Visa(Tier 4)/Short Term Study Visa">
                      UK Study Visa(Tier 4)/Short Term Study Visa
                    </option>
                    <option value="Australian Study Visa">
                      Australian Study Visa
                    </option>
                  </select>
                </Form.Group>
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="info_visa">
                  Have you ever been refused a VISA?
                </label>

                <select
                  onChange={this.handleInputChange}
                  id="info_visa"
                  as="select"
                  size="md"
                  // required
                  name="visaInfo"
                  value={this.state.data.visaInfo}
                  className="browser-default custom-select"
                >
                  <option value="">Have you ever been refused a VISA?</option>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
            {this.state.data.visaInfo === "yes" ? (
              <div className="form-group col-8 col-lg-6">
                <div className="w-75 m-auto">
                  <label for="details_visa">Explain</label>
                  <textarea
                    className="form-control"
                    id="details_visa"
                    rows="2"
                    // required
                    name="visaRefuse"
                    value={this.state.data.visaRefuse}
                    onChange={this.handleInputChange}
                  ></textarea>
                </div>
              </div>
            ) : null}
            <div className="col-12 row">
              <div className="form-group col-8 col-lg-6">
                <div className="w-75 m-auto">
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      onChange={(e) => {
                        this.setState((s) => ({
                          gre_exam: !s.gre_exam,
                        }));
                      }}
                      name="gre_exam"
                      label="GRE exam scores"
                      size="sm"
                    />
                  </Form.Group>
                  {this.state.data.gre_exam ? (
                    <GREexam
                      handleChange={this.handleGREchange}
                      Gre_obj={this.state.data.gre_details}
                    />
                  ) : null}
                </div>
              </div>
              <div className="form-group col-8 col-lg-6">
                <div className="w-75 m-auto">
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      onChange={(e) => {
                        this.setState((s) => ({
                          gmat_exam: !s.gmat_exam,
                        }));
                      }}
                      name="gmat_exam"
                      label="GMAT exam scores"
                      size="sm"
                    />
                  </Form.Group>
                  {this.state.data.gmat_exam ? (
                    <GMATexam
                      handleChange={this.gmatHandle}
                      Gmat_obj={this.state.data.gmat_details}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col-12">
              <h2 className="mx-5 p-2 mb-3 border-bottom">School Details</h2>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="s_education" className="text-left">
                  Level Of Highest Education Recieved
                </label>
                <input
                  type="text"
                  // required
                  id="s_education"
                  onChange={this.handleInputChange}
                  value={this.state.data.sch_education}
                  className="form-control p-3"
                  name="sch_education"
                  placeholder="Highest Education"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="cntry_education" className="text-left">
                  Country Of Institution
                </label>
                <input
                  type="text"
                  // required
                  id="cntry_education"
                  onChange={this.handleInputChange}
                  value={this.state.data.cntry_institution}
                  className="form-control p-3"
                  name="cntry_institution"
                  placeholder="Country Of Inst."
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="name_inst" className="text-left">
                  Name Of Institution
                </label>
                <input
                  type="text"
                  // required
                  id="name_inst"
                  onChange={this.handleInputChange}
                  value={this.state.data.name_institution}
                  className="form-control p-3"
                  name="name_institution"
                  placeholder="Name Of Inst."
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="from_inst" className="text-left">
                  Attended Inst. From
                </label>
                <input
                  type="date"
                  // required
                  id="from_inst"
                  style={{ textTransform: "uppercase" }}
                  onChange={this.handleInputChange}
                  value={this.state.data.inst_from}
                  className="form-control p-3"
                  name="inst_from"
                  placeholder="Attended From"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="to_inst" className="text-left">
                  Attended Inst. To
                </label>
                <input
                  type="date"
                  // required
                  id="to_inst"
                  style={{ textTransform: "uppercase" }}
                  onChange={this.handleInputChange}
                  value={this.state.data.inst_to}
                  className="form-control p-3"
                  name="inst_to"
                  placeholder="Attended To"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="degree_inst" className="text-left">
                  Degree Awarded
                </label>
                <input
                  type="text"
                  // required
                  id="degree_inst"
                  onChange={this.handleInputChange}
                  value={this.state.data.degree_inst}
                  className="form-control p-3"
                  name="degree_inst"
                  placeholder="Degree Awarded"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="degree_date_inst" className="text-left">
                  Degree Awarded On
                </label>
                <input
                  type="date"
                  // required
                  id="degree_date_inst"
                  style={{ textTransform: "uppercase" }}
                  onChange={this.handleInputChange}
                  value={this.state.data.degree_date_inst}
                  className="form-control p-3"
                  name="degree_date_inst"
                  placeholder="Degree Awarded On"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="inst_address" className="text-left">
                  School Address
                </label>
                <input
                  type="text"
                  // required
                  id="inst_address"
                  onChange={this.handleInputChange}
                  value={this.state.data.inst_address}
                  className="form-control p-3"
                  name="inst_address"
                  placeholder="Address"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="inst_city" className="text-left">
                  School City/Town
                </label>
                <input
                  type="text"
                  // required
                  id="inst_city"
                  onChange={this.handleInputChange}
                  value={this.state.data.inst_city}
                  className="form-control p-3"
                  name="inst_city"
                  placeholder="City/Town"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="inst_prov" className="text-left">
                  School Province
                </label>
                <input
                  type="text"
                  // required
                  id="inst_prov"
                  onChange={this.handleInputChange}
                  value={this.state.data.inst_prov}
                  className="form-control p-3"
                  name="inst_prov"
                  placeholder="Province"
                />
              </div>
            </div>
            <div className="form-group col-8 col-lg-6">
              <div className="w-75 m-auto">
                <label htmlFor="inst_p_code" className="text-left">
                  School Postal Code
                </label>
                <input
                  type="text"
                  // required
                  id="inst_p_code"
                  onChange={this.handleInputChange}
                  value={this.state.data.inst_p_code}
                  className="form-control p-3"
                  name="inst_p_code"
                  placeholder="Postal Code"
                />
              </div>
            </div>
            <div className="col-12 text-center">
              <button
                type="submit"
                className={`home-button ${
                  this.state.data.success ? "btn-success" : null
                }`}
                disabled={this.state.data.loading}
              >
                {this.state.data.loading ? (
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

export default MainForm;
