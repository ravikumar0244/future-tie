import React from "react";

const TOEFLform = ({ TOEFL, handleExamScoreValue }) => (
  <div className="mt-0">
    <input
      type="date"
      id="date-exam-toefl"
      className="form-control p-3 mt-0"
      name="dateOfExam"
      value={TOEFL.dateOfExam}
      style={{ textTransform: "uppercase" }}
      onChange={handleExamScoreValue}
      placeholder="Date Of Exam"
    />
    <input
      type="text"
      id="writing"
      className="form-control p-3 mt-0"
      name="writing"
      value={TOEFL.writing}
      onChange={handleExamScoreValue}
      placeholder="Score in Writing"
    />
    <input
      type="text"
      id=""
      className="form-control p-3 mt-1"
      name="listening"
      value={TOEFL.listening}
      placeholder="Score in Listeing"
      onChange={handleExamScoreValue}
    />
    <input
      type="text"
      id="visa"
      className="form-control p-3 mt-1"
      name="reading"
      value={TOEFL.reading}
      placeholder="Score in Reading"
      onChange={handleExamScoreValue}
    />
    <input
      type="text"
      id="visa"
      className="form-control p-3 mt-1"
      name="speaking"
      value={TOEFL.speaking}
      placeholder="Score in Speaking"
      onChange={handleExamScoreValue}
    />
  </div>
);

export default TOEFLform;
