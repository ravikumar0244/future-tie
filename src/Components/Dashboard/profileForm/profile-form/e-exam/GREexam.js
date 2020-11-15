import React from "react";

const GREexam = ({ handleChange, Gre_obj }) => {
  return (
    <div className="form-group">
      <input
        type="date"
        id="date-exam-gre"
        className="form-control p-3 mt-0"
        name="dateOfExam"
        value={Gre_obj.dateOfExam}
        style={{ textTransform: "uppercase" }}
        onChange={handleChange}
        placeholder="Date Of Exam"
      />
      <input
        type="text"
        required
        id="gre_writing"
        className="form-control p-3 mt-0"
        name="score_verbal"
        value={Gre_obj.score_verbal}
        onChange={handleChange}
        placeholder="Score in Verbal"
      />
      <input
        type="text"
        required
        id="rank_verbal"
        className="form-control p-3 mt-1"
        name="rank_verbal"
        value={Gre_obj.rank_verbal}
        onChange={handleChange}
        placeholder="Rank in Verbal"
      />
      <input
        type="text"
        required
        id="score_quantitative"
        className="form-control p-3 mt-1"
        name="score_quantitative"
        value={Gre_obj.score_quantitative}
        onChange={handleChange}
        placeholder="Score in Quantitative"
      />
      <input
        type="text"
        required
        id="rank_quantitative"
        className="form-control p-3 mt-1"
        name="rank_quantitative"
        value={Gre_obj.rank_quantitative}
        onChange={handleChange}
        placeholder="Rank in Quantitative"
      />
      <input
        type="text"
        required
        id="score_writing"
        className="form-control p-3 mt-1"
        name="score_writing"
        value={Gre_obj.score_writing}
        onChange={handleChange}
        placeholder="Score in Writing"
      />
      <input
        type="text"
        required
        id="rank_writing"
        className="form-control p-3 mt-1"
        name="rank_writing"
        value={Gre_obj.rank_writing}
        onChange={handleChange}
        placeholder="Rank in Writing"
      />
    </div>
  );
};

export default GREexam;
