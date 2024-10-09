import React, { useState } from "react";

function ParticipantForm({ addParticipant }) {
  const [participant, setParticipant] = useState({
    name: "",
    technicalScore: "",
    financialValue: "",
    comments: "",
    technicalWeightageValue: "",
    financialWeightageValue: ""
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipant({ ...participant, [name]: value });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Include additional calculated fields if needed before adding
    addParticipant(participant);
    setParticipant({
      name: "",
      technicalScore: "",
      financialValue: "",
      comments: "",
      technicalWeightageValue: "",
      financialWeightageValue: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="participant-form">
      <div className="form-group">
        <label>Name of Participant:</label>
        <input 
          type="text" 
          name="name" 
          value={participant.name} 
          onChange={handleChange} 
          placeholder="Enter name" 
        />
      </div>
      <div className="form-group">
        <label>Technical Score:</label>
        <input 
          type="number" 
          name="technicalScore" 
          value={participant.technicalScore} 
          onChange={handleChange} 
          placeholder="Enter score" 
        />
      </div>
      <div className="form-group">
        <label>Financial:</label>
        <input 
          type="number" 
          name="financialValue" 
          value={participant.financialValue} 
          onChange={handleChange} 
          placeholder="Enter financial value" 
        />
      </div>
      {/* 
      <div className="form-group">
        <label>Financial Weightage Value:</label>
        <input 
          type="number" 
          name="financialWeightageValue" 
          value={participant.financialWeightageValue} 
          onChange={handleChange} 
          placeholder="Enter financial weightage value" 
        />
      </div>  */}
      <div className="form-group">
        <label>Comments/Remarks:</label>
        <textarea 
          name="comments" 
          value={participant.comments} 
          onChange={handleChange} 
          placeholder="Add any comments"
        />
      </div>
      <button type="submit" className="add-participant-btn">Add Participant</button>

      {/* CSS for colorful design */}
      <style jsx>{`
        .participant-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          background-color: #f5f7fa;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          margin: 0 auto;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: bold;
          color: #333;
          margin-bottom: 5px;
        }

        .form-group input, .form-group textarea {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
        }

        .form-group textarea {
          resize: none;
          height: 80px;
        }

        .add-participant-btn {
          background-color: #007bff;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .add-participant-btn:hover {
          background-color: #0056b3;
        }

        .add-participant-btn:focus {
          outline: none;
          box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
        }
      `}</style>
    </form>
  );
}

export default ParticipantForm;
