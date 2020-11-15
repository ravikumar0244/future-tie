import React from "react";

const GMATexam = ({ handleChange, Gmat_obj }) => {
  return (
    <div className="form-group">
      <input
        type="date"
        id="date-exam-gmat"
        className="form-control p-3 mt-0"
        name="dateOfExam"
        value={Gmat_obj.dateOfExam}
        style={{ textTransform: "uppercase" }}
        onChange={handleChange}
        placeholder="Date Of Exam"
      />
      <input
        type="text"
        required
        id="gmat_writing"
        className="form-control p-3 mt-0"
        name="score_verbal"
        value={Gmat_obj.score_verbal}
        onChange={handleChange}
        placeholder="Score in Verbal"
      />
      <input
        type="text"
        required
        id="rank_verbal"
        className="form-control p-3 mt-1"
        name="rank_verbal"
        value={Gmat_obj.rank_verbal}
        onChange={handleChange}
        placeholder="Rank in Verbal"
      />
      <input
        type="text"
        required
        id="score_quantitative"
        className="form-control p-3 mt-1"
        name="score_quantitative"
        value={Gmat_obj.score_quantitative}
        onChange={handleChange}
        placeholder="Score in Quantitative"
      />
      <input
        required
        type="text"
        id="rank_quantitative"
        className="form-control p-3 mt-1"
        name="rank_quantitative"
        value={Gmat_obj.rank_quantitative}
        onChange={handleChange}
        placeholder="Rank in Quantitative"
      />
      <input
        type="text"
        required
        id="score_writing"
        className="form-control p-3 mt-1"
        name="score_writing"
        value={Gmat_obj.score_writing}
        onChange={handleChange}
        placeholder="Score in Writing"
      />
      <input
        type="text"
        required
        id="rank_writing"
        className="form-control p-3 mt-1"
        name="rank_writing"
        value={Gmat_obj.rank_writing}
        onChange={handleChange}
        placeholder="Rank in Writing"
      />
      <input
        type="text"
        required
        id="gmat_total"
        className="form-control p-3 mt-1"
        name="gmat_total"
        value={Gmat_obj.gmat_total}
        onChange={handleChange}
        placeholder="Total"
      />
    </div>
  );
};

export default GMATexam;
