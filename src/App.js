import React, { useState } from "react";
import ParticipantForm from './components/ParticipantForm';
import { useNavigate } from 'react-router-dom'; // For navigating to Preview

function App() {
  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    submissionDate: "",
    openingDate: "",
    estimatedCost: "",
    emdAmount: "",
    tenderId: "",
    state: "",
    website: "",
    technicalWeightage: "",
    financialWeightage: ""
  });

  const [participants, setParticipants] = useState([]);

  const navigate = useNavigate(); // for navigation

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails({ ...projectDetails, [name]: value });
  };

  const addParticipant = (participant) => {
    setParticipants([...participants, participant]);
  };

  // Function to calculate scores and rankings
  const calculateScores = () => {
    const minFinancial = Math.min(...participants.map(p => p.financialValue));
    
    // Calculate financial score, technical weightage value, financial weightage value, and combined score
    const scoredParticipants = participants.map((participant) => {
      const financialScore = (minFinancial / participant.financialValue) * 100;
      const technicalWeightageValue = (participant.technicalScore / 100) * projectDetails.technicalWeightage;
      const financialWeightageValue = (financialScore / 100) * projectDetails.financialWeightage;
      const combinedScore = technicalWeightageValue + financialWeightageValue;

      return {
        ...participant,
        financialScore: financialScore.toFixed(2),
        technicalWeightageValue: technicalWeightageValue.toFixed(2),
        financialWeightageValue: financialWeightageValue.toFixed(2),
        combinedScore: combinedScore.toFixed(2),
      };
    });

    // Sort by technical score, financial score, and combined score for ranking
    const technicalScores = [...scoredParticipants].sort((a, b) => b.technicalScore - a.technicalScore);
    const financialScores = [...scoredParticipants].sort((a, b) => b.financialScore - a.financialScore);
    const combinedScores = [...scoredParticipants].sort((a, b) => b.combinedScore - a.combinedScore);

    // Assign rankings
    return scoredParticipants.map(participant => {
      const technicalRanking = technicalScores.findIndex(p => p.name === participant.name) + 1;
      const financialRanking = financialScores.findIndex(p => p.name === participant.name) + 1;
      const combinedRanking = combinedScores.findIndex(p => p.name === participant.name) + 1;

      return {
        ...participant,
        technicalRanking,
        financialRanking,
        combinedRanking,
      };
    });
  };

  // Navigate to preview page and pass the calculated data
  const handlePreview = () => {
    const calculatedParticipants = calculateScores();
    navigate('/preview', { state: { calculatedParticipants, projectDetails } }); // Navigate to Preview
  };

  return (
    <div className="app-container">
      <h1>Project Entry Form</h1>
      <div className="form-container">
        <div className="form-group">
          <label>Project Name:</label>
          <input type="text" name="projectName" value={projectDetails.projectName} onChange={handleProjectChange} />
        </div>
        <div className="form-group">
          <label>Submission Date:</label>
          <input type="date" name="submissionDate" value={projectDetails.submissionDate} onChange={handleProjectChange} />
        </div>
        <div className="form-group">
          <label>Opening Date:</label>
          <input type="date" name="openingDate" value={projectDetails.openingDate} onChange={handleProjectChange} />
        </div>
        <div className="form-group">
          <label>Estimated Cost (INR):</label>
          <input type="number" name="estimatedCost" value={projectDetails.estimatedCost} onChange={handleProjectChange} />
        </div>
        <div className="form-group">
          <label>EMD Amount:</label>
          <input type="number" name="emdAmount" value={projectDetails.emdAmount} onChange={handleProjectChange} />
        </div>
        <div className="form-group">
          <label>Tender ID:</label>
          <input type="text" name="tenderId" value={projectDetails.tenderId} onChange={handleProjectChange} />
        </div>
        <div className="form-group">
          <label>State:</label>
          <input type="text" name="state" value={projectDetails.state} onChange={handleProjectChange} />
        </div>
        <div className="form-group">
          <label>Website:</label>
          <input type="url" name="website" value={projectDetails.website} onChange={handleProjectChange} />
        </div>
        <div className="form-group">
          <label>Technical Weightage (%):</label>
          <input type="number" name="technicalWeightage" value={projectDetails.technicalWeightage} onChange={handleProjectChange} />
        </div>
        <div className="form-group">
          <label>Financial Weightage (%):</label>
          <input type="number" name="financialWeightage" value={projectDetails.financialWeightage} onChange={handleProjectChange} />
        </div>
      </div>

      <h2>Participant Information</h2>
      <ParticipantForm addParticipant={addParticipant} />

      <button className="preview-button" onClick={handlePreview}>Preview</button>

      {/* CSS for styling */}
      <style jsx>{`
        .app-container {
          padding: 20px;
          background: #f3f4f6;
          color: #333;
          font-family: Arial, sans-serif;
        }
        .form-container {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 8px;
          border-radius: 5px;
          border: 1px solid #ccc;
          background: #fafafa;
        }
        .preview-button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
        }
        .preview-button:hover {
          background-color: #2980b9;
        }
      `}</style>
    </div>
  );
}

export default App;
