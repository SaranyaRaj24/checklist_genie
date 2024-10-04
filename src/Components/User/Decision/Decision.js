import React, { useState } from "react";
import "./Decision.css"; 

function Decision() {
  const [response1, setResponse1] = useState("");
  const [comments1, setComments1] = useState("");
  const [isChecked1, setIsChecked1] = useState(false);
  const [response2, setResponse2] = useState("");
  const [comments2, setComments2] = useState("");
  const [isChecked2, setIsChecked2] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleResponseChange1 = (event) => {
    setResponse1(event.target.value);
  };

  const handleResponseChange2 = (event) => {
    setResponse2(event.target.value);
  };

  const handleCheckboxChange1 = () => {
    if (!response1) {
      alert("Please fill the response for item 1 first");
      return;
    }
    setIsChecked1((prev) => !prev);
    alert("Checklist item 1 completed successfully");
  };

  const handleCheckboxChange2 = () => {
    if (!response2) {
      alert("Please fill the response for item 2 first");
      return;
    }
    setIsChecked2((prev) => !prev);
    alert("Checklist item 2 completed successfully");
  };

  const handleUpdate = () => {
    if (!response1 && !response2) {
      alert("Please fill the response for at least one item");
      return;
    }
    setIsUpdated(true);
    alert("Checklist updated successfully");
  };

  return (
    <div className="card">
      <h2>Decision Coach</h2>
      <table className="checklist-table">
        <thead>
          <tr>
            <th>SI.No</th>
            <th>Checklist Items</th>
            <th>Response</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    
          <tr>
            <td>1</td>
            <td>Testing</td>
            <td>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="yes"
                    checked={response1 === "yes"}
                    onChange={handleResponseChange1}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={response1 === "no"}
                    onChange={handleResponseChange1}
                  />{" "}
                  No
                </label>
              </div>
            </td>
            <td>
              <input
                type="text"
                value={comments1}
                onChange={(e) => setComments1(e.target.value)}
                placeholder="Optional Comments"
              />
            </td>
            <td>
              <span
                className={`checkbox-icon ${isChecked1 ? "checked" : ""}`}
                onClick={handleCheckboxChange1}
                style={{
                  cursor: response1 ? "pointer" : "not-allowed",
                  color: response1 ? "black" : "gray",
                }}
              >
                {isChecked1 ? "✓" : "✗"}
              </span>
            </td>
          </tr>
          
          <tr>
            <td>2</td>
            <td>Fix the bug</td>
            <td>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="yes"
                    checked={response2 === "yes"}
                    onChange={handleResponseChange2}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    value="no"
                    checked={response2 === "no"}
                    onChange={handleResponseChange2}
                  />{" "}
                  No
                </label>
              </div>
            </td>
            <td>
              <input
                type="text"
                value={comments2}
                onChange={(e) => setComments2(e.target.value)}
                placeholder="Optional Comments"
              />
            </td>
            <td>
              <span
                className={`checkbox-icon ${isChecked2 ? "checked" : ""}`}
                onClick={handleCheckboxChange2}
                style={{
                  cursor: response2 ? "pointer" : "not-allowed",
                  color: response2 ? "black" : "gray",
                }}
              >
                {isChecked2 ? "✓" : "✗"}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleUpdate} className="update-button">
        Submit
      </button>
      {isUpdated && (
        <div className="update-message">Checklist updated successfully.</div>
      )}
    </div>
  );
}

export default Decision;
