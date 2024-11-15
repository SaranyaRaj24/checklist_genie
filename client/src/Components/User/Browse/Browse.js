
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Browse.css";
import Sidebar from "../../../Components/User/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import { TextField, Button } from "@mui/material";

function Browse() {
  const [sortBy, setSortBy] = useState("Assigned");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [items, setItems] = useState([]);
  const [completedChecklist, setCompletedChecklist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing. Please log in.");
      navigate("/login");
      return;
    }

    const fetchTemplates = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/template/getTemplate`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTemplates(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, [navigate]);

  const handleView = async (name) => {
    if (name === "Daily Checklist") {
      setModalContent("Daily");
      setIsModalOpen(true);
    } else if (name === "Decision Coach") {
      setModalContent("Decision");
      setIsModalOpen(true);
    } else {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/getItems`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { templateName: name },
          }
        );
        setItems(response.data);
        setModalContent("Items");
        setIsModalOpen(true);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setItems([]);
  };

  const handleCommentsChange = (index, event) => {
    const updatedItems = [...items];
    updatedItems[index].comments = event.target.value;
    setItems(updatedItems);
  };

  const handleNumericChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].numericValue = value;
    setItems(updatedItems);
  };

  const handleYesNoChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].response = value;
    setItems(updatedItems);
  };

  const handleSubmitChecklist = () => {
    setCompletedChecklist(true);
    setTimeout(() => {
      setCompletedChecklist(false);
    }, 3000);
  };

  const handleActionClick = (index) => {
    const item = items[index];
    if (item.response || item.numericValue) {
      handleSubmitChecklist();
    } else {
      alert("Please select a response or enter a number before submitting.");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="browse-container">
        <div className="content">
          {completedChecklist && (
            <div className="alert">Checklist completed successfully!</div>
          )}

          <h2 className="checklist-heading">Assigned Checklist</h2>

          <div className="main-card">
            <div className="filter-container">
              <input
                type="text"
                placeholder="Browse Checklist"
                className="search-input"
              />
              <div className="sort-container">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                  }}
                  className="sort-select"
                >
                  <option value="Assigned">Assigned</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="card-container">
              {templates.length > 0 ? (
                templates.map((template) => (
                  <div key={template.id} className="card">
                    <h3>{template.template_name}</h3>
                    <h3
                      className="view"
                      onClick={() => handleView(template.template_name)}
                    >
                      View
                    </h3>
                  </div>
                ))
              ) : (
                <p>No templates found</p>
              )}
            </div>
          </div>

          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>
                  &times;
                </span>
                {modalContent === "Items" && (
                  <div>
                    <h3>Checklist Items</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Description</th>
                          <th style={{ width: "15rem" }}>Response</th>
                          <th>Comments</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}.</td>
                            <td>{item.checklist_name}</td>
                            <td>
                              {item.checklist_name
                                .toLowerCase()
                                .includes("number of") ||
                              item.checklist_name
                                .toLowerCase()
                                .startsWith("no of") ? (
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  value={item.numericValue || ""}
                                  onChange={(e) =>
                                    handleNumericChange(index, e.target.value)
                                  }
                                  placeholder={
                                    item.numericValue ? "" : "Optional"
                                  }
                                  type="number"
                                />
                              ) : (
                                <div>
                                  <label>
                                    <input
                                      type="radio"
                                      value="Yes"
                                      name={`yesNo-${index}`}
                                      onChange={() =>
                                        handleYesNoChange(index, "Yes")
                                      }
                                    />{" "}
                                    Yes
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      value="No"
                                      name={`yesNo-${index}`}
                                      onChange={() =>
                                        handleYesNoChange(index, "No")
                                      }
                                    />{" "}
                                    No
                                  </label>
                                </div>
                              )}
                            </td>
                            <td>
                              <TextField
                                variant="outlined"
                                size="small"
                                value={item.comments || ""}
                                onChange={(event) =>
                                  handleCommentsChange(index, event)
                                }
                                placeholder={item.comments ? "" : "Optional"}
                              />
                            </td>
                            <td>
                              <IoMdSend
                                style={{
                                  color: "green",
                                  fontSize: "1.5rem",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleActionClick(index)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Button
                      style={{ backgroundColor: "#25274D" }}
                      variant="contained"
                      color="success"
                      onClick={handleSubmitChecklist}
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Browse;



