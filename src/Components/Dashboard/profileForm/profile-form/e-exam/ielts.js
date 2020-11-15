import React from "react";

const IELTSform = ({ IELTS, handleExamScoreValue }) => (
  <div className="mt-0">
    {console.log(IELTS)}
    <input
      type="date"
      id="date-exam-ielts"
      className="form-control p-3 mt-0"
      name="dateOfExam"
      value={IELTS.dateOfExam}
      style={{ textTransform: "uppercase" }}
      onChange={handleExamScoreValue}
      placeholder="Date Of Exam"
    />
    <input
      type="text"
      id="writing"
      className="form-control p-3 mt-0"
      name="writing"
      value={IELTS.writing}
      onChange={handleExamScoreValue}
      placeholder="Score in Writing"
    />
    <input
      type="text"
      id=""
      className="form-control p-3 mt-1"
      name="listening"
      value={IELTS.listening}
      placeholder="Score in Listeing"
      onChange={handleExamScoreValue}
    />
    <input
      type="text"
      id="visa"
      className="form-control p-3 mt-1"
      name="reading"
      value={IELTS.reading}
      placeholder="Score in Reading"
      onChange={handleExamScoreValue}
    />
    <input
      type="text"
      id="visa"
      className="form-control p-3 mt-1"
      name="speaking"
      value={IELTS.speaking}
      placeholder="Score in Speaking"
      onChange={handleExamScoreValue}
    />
  </div>
);

export default IELTSform;
