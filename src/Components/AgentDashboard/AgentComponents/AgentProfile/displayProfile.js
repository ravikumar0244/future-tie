import React from "react";

export const DisplayProfile = ({ data, handleEdit }) => {
  console.log(data);
  return (
    <div className="container-fluid m-0 p-0">
      <div className="row m-0 p-0">
        <div className="header-p border-bottom   m-0">
          <h1 className="h1 text-left m-0">Profile</h1>
          <button className="btn" onClick={handleEdit}>
            Edit
          </button>
        </div>
        <div className="details-container container-fluid">
          <div className="row">
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">First Name :</span>
                <span className="h5">{data.firstName}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Last Name :</span>
                <span className="h5">{data.lastName}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Email :</span>
                <span className="h5">{data.agentEmail}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Source :</span>
                <span className="h5">{data.agentSource}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">City :</span>
                <span className="h5">{data.city}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Company Name :</span>
                <span className="h5">{data.companyName}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Country :</span>
                <span className="h5">{data.country}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">State :</span>
                <span className="h5">{data.state}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Street Address :</span>
                <span className="h5">{data.streetAddress}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Phone Number :</span>
                <span className="h5">{data.phoneNumber}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Postal Code :</span>
                <span className="h5">{data.postalCode}</span>
              </div>
            </div>
            <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
              <div className="detail">
                <span className="h5">Services Offered :</span>
                <span className="h5">{data.servicesOffered}</span>
              </div>
            </div>
            {data.fbPageName ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Facebook Page :</span>
                  <span className="h5">
                    <a href={data.fbPageName}>Visit</a>
                  </span>
                </div>
              </div>
            ) : null}
            {data.igHandle ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Instagram :</span>
                  <span className="h5">
                    <a href={data.igHandle}>Visit</a>
                  </span>
                </div>
              </div>
            ) : null}
            {data.twitterHandle ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Twiter :</span>
                  <span className="h5">
                    <a href={data.twitterHandle}>Visit</a>
                  </span>
                </div>
              </div>
            ) : null}
            {data.linkedInUrl ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">LinkedIn :</span>
                  <span className="h5">
                    <a href={data.linkedInUrl}>Visit</a>
                  </span>
                </div>
              </div>
            ) : null}
            {data.cellNumber ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Cell Phone :</span>
                  <span className="h5">{data.cellNumber}</span>
                </div>
              </div>
            ) : null}
            {data.skypeId ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Skype Id :</span>
                  <span className="h5">{data.skypeId}</span>
                </div>
              </div>
            ) : null}
            {data.whatsAppId ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">WhatsApp Id :</span>
                  <span className="h5">{data.whatsAppId}</span>
                </div>
              </div>
            ) : null}
            {data.startYear ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Begin Recruiting :</span>
                  <span className="h5">{data.startYear}</span>
                </div>
              </div>
            ) : null}
            {data.institutionsRep ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Tnstitutions Represented :</span>
                  <span className="h5">{data.institutionsRep}</span>
                </div>
              </div>
            ) : null}
            {data.recruitFrom.length > 1 ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Recruit From :</span>
                  <span className="h5">{data.recruitFrom.join(", ")}</span>
                </div>
              </div>
            ) : null}
            {data.eduAssociations ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Educational Associations :</span>
                  <span className="h5">{data.eduAssociations}</span>
                </div>
              </div>
            ) : null}
            {data.studentsEveryYear ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Students Sent Abroad Every Year :</span>
                  <span className="h5">{data.studentsEveryYear}</span>
                </div>
              </div>
            ) : null}
            {data.marketingMethods ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Marketing Methods :</span>
                  <span className="h5">{data.marketingMethods.join(", ")}</span>
                </div>
              </div>
            ) : null}
            {data.averageFee ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Average Service Fee :</span>
                  <span className="h5">{data.averageFee}</span>
                </div>
              </div>
            ) : null}
            {data.studentsEveryYearFT ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Students Refered To FutureTie :</span>
                  <span className="h5">{data.studentsEveryYearFT}</span>
                </div>
              </div>
            ) : null}
            {data.refName ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Reference Name :</span>
                  <span className="h5">{data.refName}</span>
                </div>
              </div>
            ) : null}
            {data.refEmail ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Reference Buisness Email :</span>
                  <span className="h5">{data.refEmail}</span>
                </div>
              </div>
            ) : null}
            {data.refPhone ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Reference Phone :</span>
                  <span className="h5">{data.refPhone}</span>
                </div>
              </div>
            ) : null}
            {data.refWebsite ? (
              <div className="col col-lg-6 det-card py-2 offset-lg-0 col-12">
                <div className="detail">
                  <span className="h5">Reference Website :</span>
                  <span className="h5">{data.refWebsite}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
