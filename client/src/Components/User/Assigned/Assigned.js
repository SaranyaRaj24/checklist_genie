
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import "./Assigned.css";

function Assigned() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Daily clock in", yes: false, no: false, comment: "" },
    { id: 2, name: "Monday meeting", yes: false, no: false, comment: "" },
    { id: 3, name: "Testing", yes: false, no: false, comment: "" },
    { id: 4, name: "Workdone email", yes: false, no: false, comment: "" },
    { id: 5, name: "Clock out", yes: false, no: false, comment: "" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (id, type) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, [type]: !task[type] } : task
      )
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCommentChange = (id, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, comment: value } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    alert("Task completed successfully");
  };

  return (
    <div className="assigned-containerr">
      <Navbar />
      <div className="search-bar-container">
        <TextField
          variant="outlined"
          placeholder="Search checklist"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          className="search-bar"
        />
      </div>
      <Card className="assigned-cardd">
        <CardContent>
          <Typography variant="h5" component="div" className="card-title">
            Daily Checklist
          </Typography>
          <br />

          <div className="task-table-container">
            <table className="task-table">
              <thead>
                <tr>
                  <th>CheckList</th>
                  <th>Yes</th>
                  <th>No</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={task.yes}
                        onChange={() => handleCheckboxChange(task.id, "yes")}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={task.no}
                        onChange={() => handleCheckboxChange(task.id, "no")}
                      />
                    </td>
                    <td>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={task.comment}
                        onChange={(e) =>
                          handleCommentChange(task.id, e.target.value)
                        }
                        placeholder="Add comment"
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
              className="submit-buttonn"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Assigned;
