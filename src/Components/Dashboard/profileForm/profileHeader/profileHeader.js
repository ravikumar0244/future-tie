import React from "react";

export const ProfileHeader = ({ handleClick }) => {
  return (
    <div className="container-fluid p-2 text-left">
      <button className="btn mx-2" onClick={() => handleClick(true)}>
        Details
      </button>
      <button className="btn mx-1" onClick={() => handleClick(false)}>
        Documents
      </button>
    </div>
  );
};
