import React from "react";

export const FilterForm = ({ submitHandler, clearFunc }) => {
  return (
    <form
      className="m-2 p-2 text-center"
      name="filterForm"
      onSubmit={submitHandler}
    >
      <div className="row m-0 p-0">
        <div className="col p-2 form-group">
          <select name="college" className="custom-select">
            <option value="">College</option>
            <option value="CQ University">CQ University</option>
            <option value="Southern Cross University">
              Southern Cross University
            </option>
            <option value="University of Southern Queensland">
              University of Southern Queensland
            </option>
            <option value="Torrens University">Torrens University</option>
            <option value="University of Newcastle">
              University of Newcastle
            </option>
          </select>
        </div>
        <div className="col p-2 form-group">
          <input
            type="text"
            className="form-control p-3"
            name="course"
            placeholder="Course Name"
          />
        </div>
        <div className="p-2 col">
          <select name="location" className="custom-select">
            <option value="">Location</option>
            <option value="Adelaide">Adelaide</option>
            <option value="Sydney">Sydney</option>
            <option value="Melbourne">Melbourne</option>
            <option value="Brisbane">Brisbane</option>
            <option value="Online">Online</option>
            <option value="Bundaberg">Bundaberg</option>
            <option value="Cairns">Cairns</option>
            <option value="Gladstone">Gladstone</option>
            <option value="Mackay">Mackay</option>
            <option value="Perth">Perth</option>
            <option value="Rockhampton">Rockhampton</option>
            <option value="Townsville">Townsville</option>
            <option value="Rockhampton North">Rockhampton North</option>
            <option value="Lismore">Lismore</option>
            <option value="Gold Coast">Gold Coast</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Coffs Harbour">Coffs Harbour</option>
            <option value="Springfield">Springfield</option>
            <option value="Toowoomba">Toowoomba</option>
            <option value="Newcastle city">Newcastle city</option>
          </select>
        </div>
        <div className="p-2 col">
          <select name="fees" className="custom-select">
            <option value="">Select Annual Fees</option>
            <option value="24000">Less than $24000</option>
            <option value="26000">Less than $26000</option>
            <option value="28000">Less than $28000</option>
            <option value="30000">Less than $30000</option>
          </select>
        </div>
        <div className="p-2 col">
          <select name="ielts" className="custom-select">
            <option value="">Select Overall Ielts Score</option>
            <option value="6.0">Less than 6.0</option>
            <option value="6.5">Less than 6.5</option>
            <option value="7.0">Less than 7.0</option>
            <option value="7.5">Less than 7.5</option>
          </select>
        </div>
      </div>
      <div className="col-12 text-center">
        <button type="submit" className="mx-2 btn btn-primary">
          Apply
        </button>
        <button onClick={clearFunc} className="mx-2 btn btn-primary">
          Clear Filter
        </button>
      </div>
    </form>
  );
};
