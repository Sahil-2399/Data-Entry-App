import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx"; // Ensure you have XLSX imported

function PreviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { calculatedParticipants, projectDetails } = location.state;

  const goBack = () => {
    navigate('/');
  };

  const exportToExcel = () => {
    const { projectName, submissionDate, openingDate, estimatedCost, emdAmount, tenderId, state, website, technicalWeightage, financialWeightage } = projectDetails;
    
    const filename = "project_data.xlsx";

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Prepare project details in a stacked format
    const projectData = [
      { 'Details': 'Project Name', 'Value': projectName },
      { 'Details': 'Submission Date', 'Value': submissionDate },
      { 'Details': 'Opening Date', 'Value': openingDate },
      { 'Details': 'Estimated Cost (INR)', 'Value': estimatedCost },
      { 'Details': 'EMD Amount', 'Value': emdAmount },
      { 'Details': 'Tender ID', 'Value': tenderId },
      { 'Details': 'State', 'Value': state },
      { 'Details': 'Website', 'Value': website },
      { 'Details': 'Technical Weightage (%)', 'Value': technicalWeightage },
      { 'Details': 'Financial Weightage (%)', 'Value': financialWeightage },
    ];

    // Create a worksheet for project details
    const projectSheet = XLSX.utils.json_to_sheet(projectData);

    // Add title for project data
    XLSX.utils.sheet_add_aoa(projectSheet, [['Project Details']], { origin: 'A1' });

    // Append the project details
   // XLSX.utils.sheet_add_aoa(projectSheet, [['Data', 'Entered Value']], { origin: 'A2' }); // Add headers for project data
    XLSX.utils.sheet_add_json(projectSheet, projectData, { skipHeader: true, origin: 'A2' }); // Start adding data from A3

    // Prepare participant data with all calculated values
    const participantSheetData = calculatedParticipants.map(participant => ({
      Name: participant.name,
      Technical_Score: participant.technicalScore,
      Financial_Value: participant.financialValue,
      Financial_Score: participant.financialScore,
      Technical_Weightage_Value: participant.technicalWeightageValue,
      Financial_Weightage_Value: participant.financialWeightageValue,
      Combined_Score: participant.combinedScore,
      Technical_Ranking: participant.technicalRanking,
      Financial_Ranking: participant.financialRanking,
      Combined_Ranking: participant.combinedRanking,
      Comments: participant.comments,
    }));

    // Add an empty row between project data and participant data
    XLSX.utils.sheet_add_aoa(projectSheet, [[]], { origin: 'A' + (projectData.length + 4) }); // Leaving a row after project data

    // Add title for participant data
    XLSX.utils.sheet_add_aoa(projectSheet, [['Participant Data']], { origin: 'A' + (projectData.length + 5) }); // Start title after empty row

    // Append the participant headers starting from A
    const participantHeaders = [
      "Participant Name",
      "Technical Score",
      "Technical Weightage Value",
      "Financial",
      "Financial Score",
      "Financial Weightage Value",
      "Combined Score",
      "Technical Ranking",
      "Financial Ranking",
      "Combined Ranking",
      "Comments/Remarks"
    ];

    XLSX.utils.sheet_add_aoa(projectSheet, [participantHeaders], { origin: 'A' + (projectData.length + 3) }); // Add headers for participant data
// Set width for column A
projectSheet['!cols'] = [{ wch: 20 }]; // 30 characters width for column A

    // Append the participant data starting from A
    XLSX.utils.sheet_add_json(projectSheet, participantSheetData, { skipHeader: true, origin: 'A' + (projectData.length + 4) }); // Start adding data below headers

    // Append the project sheet to the workbook
    XLSX.utils.book_append_sheet(wb, projectSheet, "Project Details");

    // Write the file
    XLSX.writeFile(wb, filename);
  };

  return (
    <div>
      <h2>Preview of Calculated Scores</h2>
      
      {/* Display Project Details */}
      <h2>Project Details</h2>
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ backgroundColor: "#FFD700" }}>Project Name:</td>
            <td>{projectDetails.projectName}</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#FFD700" }}>Submission Date:</td>
            <td>{projectDetails.submissionDate}</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#FFD700" }}>Opening Date:</td>
            <td>{projectDetails.openingDate}</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#FFD700" }}>Estimated Cost (INR):</td>
            <td>{projectDetails.estimatedCost}</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#FFD700" }}>EMD Amount:</td>
            <td>{projectDetails.emdAmount}</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#FFD700" }}>Tender ID:</td>
            <td>{projectDetails.tenderId}</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#FFD700" }}>State:</td>
            <td>{projectDetails.state}</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#FFD700" }}>Website:</td>
            <td>{projectDetails.website}</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#FFD700" }}>Technical Weightage (%):</td>
            <td>{projectDetails.technicalWeightage}</td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#FFD700" }}>Financial Weightage (%):</td>
            <td>{projectDetails.financialWeightage}</td>
          </tr>
        </tbody>
      </table>

      {/* Display Participants Table */}
      <h3>Participants and Scores</h3>
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: "#FFD700" }}>Participant Name</th>
            <th style={{ backgroundColor: "#FFD700" }}>Technical Score</th>
            <th style={{ backgroundColor: "#ADD8E6" }}>Technical Weightage Value</th>
            <th style={{ backgroundColor: "#FFD700" }}>Financial</th>
            <th style={{ backgroundColor: "#ADD8E6" }}>Financial Score</th>
            <th style={{ backgroundColor: "#ADD8E6" }}>Financial Weightage Value</th>
            <th style={{ backgroundColor: "#ADD8E6" }}>Combined Score</th>
            <th style={{ backgroundColor: "#ADD8E6" }}>Technical Ranking</th>
            <th style={{ backgroundColor: "#ADD8E6" }}>Financial Ranking</th>
            <th style={{ backgroundColor: "#ADD8E6" }}>Combined Ranking</th>
            <th style={{ backgroundColor: "#ADD8E6" }}>Comments/Remarks</th>
          </tr>
        </thead>
        <tbody>
          {calculatedParticipants.map((participant, index) => (
            <tr key={index}>
              <td>{participant.name}</td>
              <td>{participant.technicalScore}</td>
              <td>{participant.technicalWeightageValue}</td>
              <td>{participant.financialValue}</td>
              <td>{participant.financialScore}</td>
              <td>{participant.financialWeightageValue}</td>
              <td>{participant.combinedScore}</td>
              <td>T{participant.technicalRanking}</td>
              <td>L{participant.financialRanking}</td>
              <td>H{participant.combinedRanking}</td>
              <td>{participant.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={exportToExcel} style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px", margin: "10px" }}>Save to Excel</button>
      <button onClick={goBack} style={{ backgroundColor: "#f44336", color: "white", padding: "10px 20px", margin: "10px" }}>Back to Form</button>
    </div>
  );
}

export default PreviewPage;
