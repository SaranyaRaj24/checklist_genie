
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./Reports.css";

const progressData = {
  labels: ["Not Started", "In Progress", "Completed", "Delayed"],
  datasets: [
    {
      data: [5, 15, 20, 10],
      backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0", "#ffcd56"],
    },
  ],
};

const timeSpentData = {
  labels: ["Checklist 1", "Checklist 2", "Checklist 3", "Checklist 4"],
  datasets: [
    {
      label: "Hours Spent",
      data: [12, 8, 15, 10],
      backgroundColor: "#36a2eb",
    },
  ],
};

function Reports() {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    alert("Comment shared successfully");
    setComment("");
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" className="reports-container">
        <Box my={4} textAlign="center">
          <Typography variant="h4" gutterBottom>
            Performance Report Dashboard
          </Typography>
          <Box
            mb={2}
            className="filters"
            display="flex"
            justifyContent="center"
          >
            <Select
              defaultValue="last-week"
              variant="outlined"
              className="filter-select"
            >
              <MenuItem value="last-week">Today</MenuItem>
              <MenuItem value="last-month">Last Week</MenuItem>
              <MenuItem value="custom-range">Last Month</MenuItem>
            </Select>
          </Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={3} className="summary-item">
                <Typography variant="h6" gutterBottom>
                  Completion Percentage
                </Typography>
                <Box className="progress-circle">
                  <Typography variant="h3">75%</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={3} className="summary-item">
                <Typography variant="h6" gutterBottom>
                  Total Time Spent
                </Typography>
                <Typography variant="h4">120 hours</Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} marginTop={2} justifyContent="center">
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={3} className="chart-paper">
                <Typography variant="h6" gutterBottom>
                  Progress Level
                </Typography>
                <Pie data={progressData} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={3} className="chart-paper">
                <Typography variant="h6" gutterBottom>
                  Time Spent Per Checklist
                </Typography>
                <Bar data={timeSpentData} />
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} marginTop={2} justifyContent="center">
            <Grid item xs={12}>
              <Paper elevation={3} className="chart-paper">
                <Typography variant="h6" gutterBottom>
                  My Comments
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={comment}
                  onChange={handleCommentChange}
                  className="textarea-feedback"
                  placeholder="Drop your comments here..."
                />
                <br></br>
                <Button style={{backgroundColor:"#25274D"}}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className="submit-button"
                >
                  Submit
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Reports;

