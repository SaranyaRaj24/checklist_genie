import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AssignedTask.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Navbar from "../../../Pages/admin/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

// import ShareIcon from "@mui/icons-material/Share";

const AssignedTask = () => {
  const navigate = useNavigate();


  const [data, setData] = useState([]);
  const [selectedTemplateDetails, setSelectedTemplateDetails] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checklist_name, setChecklist_name] = useState("");
  const [Instructions, setInstructions] = useState("");
  const [dataType, setDataType] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAllTags = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/template/getTemplate`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.templates);
      } catch (error) {
        console.error("Error fetching tags data:", error);
      }
    };

    fetchAllTags();
  }, []);

  const getTagWithTemplateAndItems = async (
    tag_id,
    current_version_id,
    template_id
  ) => {
    const token = localStorage.getItem("token");

    try {
      const selectedTemplate = data.find((item) => item.id === template_id);

      setSelectedTemplateDetails(selectedTemplate);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/getItemsByTemplate/${tag_id}/${current_version_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedTemplate(response.data);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Error fetching tag with template and items:", error);
    }
  };

  const editTag = async (tag_id, current_version_id, template_id) => {
    const token = localStorage.getItem("token");
    try {
      
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/getItemsByTemplate/${tag_id}/${current_version_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      const selectedTemplate = data.find((item) => item.id === template_id);

      setSelectedTemplateDetails(selectedTemplate);


      setSelectedTemplate(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching tag for editing:", error);
    }
  };
  const deleteTag = async (tag_id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/tags/deleteTag/${tag_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(data.filter((tag) => tag.id !== tag_id));
      alert("Tag successfully deleted!");
    } catch (error) {
      console.error("Error deleting tag:", error);
      alert("Failed to delete the tag.");
    }
  };

  const addExtraItem = async (tag_id,template_id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/addItem/${tag_id}/${template_id}`,
        {
          checklist_name,
          Instructions,
          input_type: dataType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newItem = response.data?.extraItem;

      if (newItem) {
        setSelectedTemplate((prevTag) => [
          ...prevTag, 
          {
            id: newItem.id,
            checklist_name: newItem.checklist_name,
            input_type: newItem.input_type,
          },
        ]);
      
      }

      alert("Item successfully added!");

      

      setChecklist_name("");
      setInstructions("");
      setDataType("");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item.");
    }
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedTemplate(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  const handletemplaterecepients = (templateId) => {
  navigate(`/admin/templaterecepients/${templateId}`);
};


  return (
    <>
      <Navbar />
      <div className="container">
        {data.map((template) => (
          <div key={template.id} className="cardd">
            <div className="card-headerr">
              <h2>{template.template_name}</h2>
              <p>
                <strong>User Positions:</strong> {template.Tags?.user_position}
              </p>
              <button
                onClick={() =>
                  getTagWithTemplateAndItems(
                    template.Tags.id,
                    template.current_version_id,
                    template.id
                  )
                }
              >
                VIEW
              </button>
              <div className="iconss">
                <p
                  onClick={() =>
                    editTag(
                      template.Tags.id,
                      template.current_version_id,
                      template.id
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <EditIcon />
                </p>
                <p
                  onClick={() => deleteTag(template.id)}
                  style={{ cursor: "pointer" }}
                >
                  <DeleteIcon />
                </p>

                <p
                  onClick={() => handletemplaterecepients(template.id)}
                  style={{ cursor: "pointer" }}
                >
                  <PersonAddIcon />
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* View Modal */}
        {isViewModalOpen && selectedTemplate && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={closeViewModal}>
                &times;
              </span>
              <h2>{selectedTemplateDetails.template_name}</h2>
              <h3>Existing Items</h3>
              <table className="details-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Input Type</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTemplate && selectedTemplate.length > 0 ? (
                    selectedTemplate.map((item) => (
                      <tr key={item.id}>
                        <td>{item.checklist_name}</td>
                        <td>{item.input_type}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No items available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isModalOpen && selectedTemplate && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-button" onClick={closeModal}>
                &times;
              </span>
              <h2>{selectedTemplateDetails.template_name}</h2>

              <div className="modal-body">
                {/* Left Side: Edit/Add Item */}
                <div className="edit-item-section">
                  <h3>Edit/Add Item</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Checklist Name"
                      value={checklist_name}
                      onChange={(e) => setChecklist_name(e.target.value)}
                    />

                    <input
                      type="text"
                      name="Instructions"
                      placeholder="Instructions"
                      value={Instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                    <select
                      name="input_type"
                      value={dataType}
                      onChange={(e) => setDataType(e.target.value)}
                    >
                      <option value="">Select Input Type</option>
                      <option value="Boolean">Boolean</option>
                      <option value="Numeric">Numeric</option>
                    </select>
                    <br />
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        addExtraItem(selectedTemplateDetails.Tags.id, selectedTemplateDetails.id);
                      }}
                    >
                      Add/Update Item
                    </button>
                  </form>
                </div>

                {/* Right Side: Existing Items */}
                <div className="existing-items-section">
                  <h3>Existing Items</h3>
                  <table className="details-table">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Input Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTemplate &&
                      selectedTemplate.length > 0 ? (
                        selectedTemplate.map((item) => (
                          <tr key={item.id}>
                            <td>{item.checklist_name}</td>
                            <td>{item.input_type}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2">No items available.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AssignedTask;
