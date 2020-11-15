import React from "react";
import "./styles.css";
import backArrow from "../../../../Img/Menu Icons/Back Arrow.png";

//   agentEmail: "sdnbhj@c.com"
// agentSource: "sourceOne"
// city: "hjghjghjg"
// companyName: "dsfjhbn"
// country: "hjghjghjghj"
// eduAssociations: "hgjhghghj"
// firstName: "kjgjhghj"
// lastName: "hjghjghj"
// marketingMethods: [{…}]
// phoneNumber: "jhjghjghj"
// postalCode: "jhgjhg"
// recruitFrom: [{…}]
// servicesOffered: "hjghjghjg"
// state: "ghjghjgjhg"
// streetAddress: "hjghjghj"
// verified: true

export const DisplayDet = ({ userDet, handleEdit, closeFunc }) => {
  const { Profile, byAgent } = userDet;
  if (!Profile.firstName) return null;
  return (
    <div className="conatiner-fluid m-0 p-0 profle-details ">
      <div className="row m-0 p-0">
        <div className="header-p border-bottom m-0">
          {byAgent ? (
            <button
              className="btn btn-primary m-0 mr-1 px-4 btn-color"
              onClick={closeFunc}
            >
              <img src={backArrow} alt="backArrow" />
            </button>
          ) : null}
          <h1 className="h1 text-left m-0">Profile</h1>
          {!byAgent ? (
            <button className="btn" onClick={handleEdit}>
              Edit
            </button>
          ) : null}
        </div>
        <div className="details-container container-fluid">
          <div className="row">
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">First Name :</span>
                <span className="h5">{Profile.firstName}</span>
              </div>
            </div>
            {Profile.middleName ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Middle Name :</span>
                  <span className="h5">{Profile.middleName}</span>
                </div>
              </div>
            ) : null}
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Last Name :</span>
                <span className="h5">{Profile.lastName}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">DOB :</span>
                <span className="h5">{Profile.dateOfBirth}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Gender :</span>
                <span className="h5">{Profile.gender}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Marital Status :</span>
                <span className="h5">{Profile.maritalStatus}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">First Language :</span>
                <span className="h5">{Profile.firstLanguage}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Passport Number :</span>
                <span className="h5">{Profile.passportNumber}</span>
              </div>
            </div>

            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Address :</span>
                <span className="h5">{Profile.address}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">City/Town :</span>
                <span className="h5">{Profile.city_town}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Country :</span>
                <span className="h5">{Profile.country}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">State :</span>
                <span className="h5">{Profile.state}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Postal Code :</span>
                <span className="h5">{Profile.postal}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Email :</span>
                <span className="h5">{Profile.email}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Contact Number :</span>
                <span className="h5">{Profile.mobileNumber}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Nationality :</span>
                <span className="h5">{Profile.nationality}</span>
              </div>
            </div>
            <div className="col col-12 col-lg-6 offset-lg-0 pt-lg-0 pt-2">
              <div className="detail">
                <span className="h5">Residence :</span>
                <span className="h5">{Profile.residency}</span>
              </div>
            </div>
            <div className="col col-12 col-lg-6 offset-lg-0 pt-3">
              <div className="detail">
                <span className="h5">Country Of Education :</span>
                <span className="h5">{Profile.education_c}</span>
              </div>
            </div>
            <div className="col col-12 col-lg-6 offset-lg-0 pt-3">
              <div className="detail">
                <span className="h5">Highest Education :</span>
                <span className="h5">{Profile.h_education}</span>
              </div>
            </div>
            <div className="col col-12 col-lg-6 offset-lg-0 pt-3 pb-3">
              <div className="detail">
                <span className="h5">Visa:</span>
                <span className="h5">{Profile.visa}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className=" col-12 col-lg-6 offset-lg-0 pt-3">
              <div className="detail">
                <span className="h5">Average Grade :</span>
                <span className="h5">{Profile.g_average}</span>
              </div>
            </div>
            <div className=" col-12 col-lg-6 offset-lg-0 pt-3">
              <div className="detail">
                <span className="h5">Grading Scheme:</span>
                <span className="h5">{Profile.g_scheme}</span>
              </div>
            </div>
            <div className="col-12 col-lg-6 offset-lg-0 pt-3">
              <div className="detail">
                <span className="h5">Country Of Institution :</span>
                <span className="h5">{Profile.cntry_institution}</span>
              </div>
            </div>
            <div className="col-12 col-lg-6 offset-lg-0 pt-3">
              <div className="detail">
                <span className="h5">Name Of Institution :</span>
                <span className="h5">{Profile.name_institution}</span>
              </div>
            </div>
            <div className="col-12 col-lg-6 offset-lg-0 pt-3">
              <div className="detail">
                <span className="h5">Attended Institution From :</span>
                <span className="h5">{Profile.inst_from}</span>
              </div>
            </div>
            <div className="col-12 col-lg-6 offset-lg-0 pt-3">
              <div className="detail">
                <span className="h5">Attended Institution To :</span>
                <span className="h5">{Profile.inst_to}</span>
              </div>
            </div>
            <div className="col-12 col-lg-6 offset-lg-0 pt-3">
              <div className="detail">
                <span className="h5">Degree Awarded :</span>
                <span className="h5">{Profile.degree_inst}</span>
              </div>
            </div>
            <div className="col-12 col-lg-6 offset-lg-0 pt-3">
              <div className="detail">
                <span className="h5">Degree Awarded on :</span>
                <span className="h5">{Profile.degree_date_inst}</span>
              </div>
            </div>{" "}
            <div className="col-12 col-lg-6 offset-lg-0 pt-3">
              <div className="detail">
                <span className="h5">School Address :</span>
                <span className="h5">{Profile.inst_address}</span>
              </div>
            </div>
            <div className="col-12 col-lg-6 offset-lg-0 pt-3">
              <div className="detail">
                <span className="h5">School City :</span>
                <span className="h5">{Profile.inst_city}</span>
              </div>
            </div>
            <div className="col-12 col-lg-6 offset-lg-0 pt-3">
              <div className="detail">
                <span className="h5">School Province :</span>
                <span className="h5">{Profile.inst_prov}</span>
              </div>
            </div>
            <div className="col-12 col-lg-6 offset-lg-0 pt-3">
              <div className="detail">
                <span className="h5">School Postal Code :</span>
                <span className="h5">{Profile.inst_p_code}</span>
              </div>
            </div>
            {Profile.IELTS.listening ? (
              <div className="col pt-3 col-12 border-bottom pb-2">
                <div className="detail-e">
                  <span className="h5">IELTS</span>
                  <div className="details mt-3">
                    <div className="detail-e text-left">
                      <span className="h5 py-1">
                        Listening : {Profile.IELTS.listening}
                      </span>
                    </div>
                    <div className="detail-e text-left">
                      <span className="h5 py-1">
                        Writing : {Profile.IELTS.writing}
                      </span>
                    </div>
                    <div className="detail-e text-left">
                      <span className="h5 py-1">
                        Speaking : {Profile.IELTS.speaking}
                      </span>
                    </div>
                    <div className="detail-e text-left">
                      <span className="h5 py-1">
                        Reading : {Profile.IELTS.reading}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {Profile.TOEFL.listening ? (
              <div className="col pt-3 col-12 border-bottom pb-2">
                <div className="detail-e">
                  <span className="h5">TOEFL</span>
                  <div className="details mt-3">
                    <div className="detail-e text-left">
                      <span className="h5 py-1">
                        Listening : {Profile.TOEFL.listening}
                      </span>
                    </div>
                    <div className="detail-e text-left">
                      <span className="h5 py-1">
                        Writing : {Profile.TOEFL.writing}
                      </span>
                    </div>
                    <div className="detail-e text-left">
                      <span className="h5 py-1">
                        Speaking : {Profile.TOEFL.speaking}
                      </span>
                    </div>
                    <div className="detail-e text-left">
                      <span className="h5 pt-1">
                        Reading : {Profile.TOEFL.reading}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {Profile.gmat_exam ? (
              <div className="col pt-3 col-12 border-bottom pb-2">
                <div className="detail-e">
                  <span className="h5">GMAT</span>
                  <div className="details mt-3">
                    <div className="detail-e text-left">
                      <span className="h5">
                        Rank Quantitative :
                        {Profile.gmat_details.rank_quantitative}
                      </span>
                      <span className="h5">
                        Rank Quantitative :
                        {Profile.gmat_details.rank_quantitative}
                      </span>
                    </div>
                    <div className="detail-e text-left">
                      <span className="h5">
                        Rank Verbal :{Profile.gmat_details.rank_verbal}
                      </span>
                      <span className="h5">
                        Score Verbal :{Profile.gmat_details.score_verbal}
                      </span>
                    </div>
                    <div className="detail-e text-left">
                      <span className="h5">
                        Rank Writing :{Profile.gmat_details.rank_writing}
                      </span>
                      <span className="h5">
                        Score Writing :{Profile.gmat_details.score_writing}
                      </span>
                    </div>
                    <div className="total text-left w-100">
                      <span className="h5">
                        Total :{Profile.gmat_details.gmat_total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {Profile.gre_exam ? (
              <div className="col pt-3 col-12 border-bottom pb-2">
                <div className="detail-e">
                  <span className="h5">GRE</span>
                  <div className="details mt-3">
                    <div className="detail-e text-left">
                      <span className="h5">
                        Rank Quantitative :
                        {Profile.gre_details.rank_quantitative}
                      </span>
                      <span className="h5">
                        Rank Quantitative :
                        {Profile.gre_details.rank_quantitative}
                      </span>
                    </div>
                    <div className="detail-e text-left">
                      <span className="h5">
                        Rank Verbal :{Profile.gre_details.rank_verbal}
                      </span>
                      <span className="h5">
                        Score Verbal :{Profile.gre_details.score_verbal}
                      </span>
                    </div>
                    <div className="detail-e text-left">
                      <span className="h5">
                        Rank Writing :{Profile.gre_details.rank_writing}
                      </span>
                      <span className="h5">
                        Score Writing :{Profile.gre_details.score_writing}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
