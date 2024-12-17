import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AssignedTask.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AssignedTask = () => {
  const [data, setData] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
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
          `${process.env.REACT_APP_BACKEND_SERVER_URL}/tags/getAll`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching tags data:", error);
      }
    };

    fetchAllTags();
  }, []);

  const getTagWithTemplateAndItems = async (tag_id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/tags/getInfo/${tag_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedTag(response.data);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Error fetching tag with template and items:", error);
    }
  };

  const editTag = async (tag_id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/tags/getInfo/${tag_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedTag(response.data);
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

  const addExtraItem = async () => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/items/addItem/${selectedTag.Tag_id}`,
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
  
      const newItem = response.data?.extraItems;
  
      if (newItem) {
        setSelectedTag((prevTag) => ({
          ...prevTag,
          Items: [...(prevTag?.Items || []), { 
            id: newItem.id,
            Item_name: newItem.checklist_name, 
            Input_type: newItem.input_type,
          }],
        }));
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
    setSelectedTag(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTag(null);
  };
  

  return (
    <div className="container">
      {data.map((tag) => (
        <div key={tag.id} className="cardd">
          <div className="card-headerr">
            <h2>{tag.tag_name}</h2>
            <p>
              <strong>User Positions:</strong> {tag.user_position}
            </p>
            <button onClick={() => getTagWithTemplateAndItems(tag.id)}>VIEW</button>
            <div className="iconss">
              <p onClick={() => editTag(tag.id)} style={{ cursor: "pointer" }}>
                <EditIcon />
              </p>
              <p 
              onClick={() => deleteTag(tag.id)} style={{ cursor: "pointer" }}
              >
                <DeleteIcon />
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* View Modal */}
      {isViewModalOpen && selectedTag && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeViewModal}>
              &times;
            </span>
            <h2>{selectedTag.tag_name}</h2>
            <h3>Existing Items</h3>
            <table className="details-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Input Type</th>
                </tr>
              </thead>
              <tbody>
                {selectedTag.Items && selectedTag.Items.length > 0 ? (
                  selectedTag.Items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.Item_name}</td>
                      <td>{item.Input_type}</td>
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
      {isModalOpen && selectedTag && (
  <div className="modal">
    <div className="modal-content">
      <span className="close-button" onClick={closeModal}>
        &times;
      </span>
      <h2>{selectedTag.tag_name}</h2>

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
    addExtraItem(selectedTag.Tag_id); 
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
              {selectedTag.Items && selectedTag.Items.length > 0 ? (
                selectedTag.Items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.Item_name}</td>
                    <td>{item.Input_type}</td>
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
  );
};

export default AssignedTask;
