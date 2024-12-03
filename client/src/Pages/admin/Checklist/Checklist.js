import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../admin/Checklist/Checklist.css";
import Navbar from "../../../Pages/admin/Navbar/Navbar";

const Checklist = () => {
  const [update, setUpdate] = useState(false);
  const [priorityVisible, setPriorityVisible] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [template_name, setTemplate_name] = useState("");
  const [tags, setTags] = useState([]);
  const [tag_id, setTag_id] = useState(null);
  const [tag_name, setTag_name] = useState("");
  const [checklist_name, setChecklist_name] = useState("");
  const [Instructions, setInstructions] = useState("");
  const [dataType, setDataType] = useState("");

  const priorities = ["High", "Medium", "Low"];

  

  const handlePriorityClick = () => {
    setPriorityVisible(!priorityVisible);
  };

  const handleSelectPriority = (priority) => {
    setSelectedPriority(priority);
    setPriorityVisible(false);
    console.log(`Priority selected: ${priority}`);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    console.log(`Selected date: ${e.target.value}`);
  };

 

  const handleAddItemsClick = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Payload:", {
        template_name,
        tag_id: parseInt(tag_id),
        tag_name,
      });
      const template = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/template/createTemplate`,
        {
          template_name,
          tag_id: parseInt(tag_id),
          tag_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Template Created Successfully!!!");
      console.log("Template Created:", template.data);
      setUpdate(true);
    } catch (error) {
      console.log("Error saving template:", error);
      alert("No Templates created!!");
    }

    setIsModalOpen(true);
  };

  useEffect(() => {
    const storeTokenNew = () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token stored from URL:", token);
      }
    };

    storeTokenNew();

    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      console.log("Token retrieved:", storedToken);
    } else {
      console.log("No token found");
    }

    const getTags = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Attempting to fetch templates...");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/tags/getAll`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTags(response.data);
        console.log("Tags fetched:", response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    getTags();
  }, []);

  const handleSelectName = (e) => {
    const selectedTagName = e.target.value;
    setTag_name(selectedTagName);

    const selectedTag = tags.find((tag) => tag.tag_name === selectedTagName);
    if (selectedTag) {
      setTag_id(selectedTag.id);
    }
  };

  const handleSaveNewItem = async () => {
    try {
      const token = localStorage.getItem("token");
  
     
  
      const item = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/createItems`,
        {
          checklist_name,
          Instructions,
          tag_id: parseInt(tag_id),
          input_type: dataType, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert("Item created successfully!");
      console.log("Item response:", item.data);
    } catch (error) {
      console.error("Error creating item:", error);
      alert("Failed to create item. Please try again.");
    }
  };
  
  return (
    <>
      <div className="dashboard-container">
        <Navbar />
        {update && (
          <div className="alert-message-position">Saved Successfully!</div>
        )}
       <div className=" popup" >
        <div className="content">
          <div style={{fontWeight:'bold'}} >
            Checklist Name:  
            <input
            style={{width:'12rem', height:'2.5rem', marginLeft:'2rem'}}
              type="text"
              value={template_name}
              onChange={(e) => setTemplate_name(e.target.value)}
            />
          </div>
          <br/>
 
          <div className="tag-dropdown">
            <label style={{fontWeight:'bold', marginRight:'2.3rem'}} >Select Tag:</label>
            <select value={tag_name} onChange={handleSelectName}>
              <option value="">Select a tag Name</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.tag_name}>
                  {tag.tag_name}
                </option>
              ))}
            </select>
          </div>
 
          <button className="add-position" onClick={handleAddItemsClick}>
            Add Items
          </button>
 
         
        </div>
</div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Checklist Name</h2>
              <div className="first-fill">
                <button style={{ marginRight: "10rem" }}>
                  Date:{" "}
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="date-picker"
                  />
                </button>

                <button
                  style={{ marginRight: "10rem" }}
                  onClick={handlePriorityClick}
                  className="priority-label"
                >
                  Priority: {selectedPriority || "Select"}
                </button>
                {priorityVisible && (
                  <div className="priority-dropdown">
                    {priorities.map((priority, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectPriority(priority)}
                        className="dropdown-option"
                      >
                        {priority}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <br />
              <div className="input-field">
                <label>Item Name:</label>
                <input
                  type="text"
                  value={checklist_name}
                  onChange={(e) => setChecklist_name(e.target.value)}
                />
                <label>Description:</label>
                <textarea
                  value={Instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
                <br></br>
                <label>Input Type:</label>
                <select
                  value={dataType}
                  onChange={(e) => setDataType(e.target.value)}
                  >
                  <option value="">Select Input Type</option>
                  <option value="Boolean">Boolean</option>
                  <option value="Numeric">Numeric</option>
                </select>
              </div>
              <br></br>
              <button
                style={{ backgroundColor: "#25274D" }}
                onClick={handleSaveNewItem}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Checklist;
