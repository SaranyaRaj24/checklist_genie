import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AssignedTask.css";

const AssignedTask = () => {
  const [data, setData] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching tag with template and items:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTag(null);
  };

  return (
    <div className="container">
      

      {data.map((tag) => (
        <div key={tag.id} className="cardd">
          <div className="card-header">
            <h2>{tag.tag_name}</h2>
            <p>
              <strong>User Positions:</strong>{tag.user_position}
            </p>
            <button
              onClick={() => getTagWithTemplateAndItems(tag.id)}
              className="view-button"
            >
              VIEW
            </button>
          </div>
        </div>
      ))}

      {isModalOpen && selectedTag && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h2> {selectedTag.Tag_name}</h2>

            <table className="details-table">
              <thead>
                <tr>
                  <th>Template Name</th>
                </tr>
              </thead>
              <tbody>
                {selectedTag.Templates.length > 0 ? (
                  selectedTag.Templates.map((template) => (
                    <tr key={template.Template_id}>
                      <td>{template.Template_name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No templates available.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <h3>Items</h3>
            <table className="details-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                </tr>
              </thead>
              <tbody>
                {selectedTag.Items.length > 0 ? (
                  selectedTag.Items.map((item) => (
                    <tr key={item.Item_id}>
                      <td>{item.Item_name}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No items available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedTask;
