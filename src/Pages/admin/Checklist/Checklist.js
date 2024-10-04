
import React, { useState } from 'react';
import '../../admin/Checklist/Checklist.css';
import Navbar from '../../../Pages/admin/Navbar/Navbar';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Checklist = () => {
  const [update, setUpdated] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [priorityVisible, setPriorityVisible] = useState(false); 
  const [selectedPriority, setSelectedPriority] = useState('');  
  const [selectedDate, setSelectedDate] = useState(''); 

  const handleUpdate = () => {
    setUpdated(true);
    setTimeout(() => setUpdated(false), 3000);
  };

  const handleShared = () => {
    setDropdownVisible(true);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setDropdownVisible(false);
    console.log(`Assigned to: ${user}`);
  };

  const handlePriorityClick = () => {
    setPriorityVisible(!priorityVisible); 
  };

  const handleSelectPriority = (priority) => {
    setSelectedPriority(priority);
    setPriorityVisible(false);
    console.log(`Priority selected: ${priority}`);
  };

  const users = ['All','Ashwin', 'Amal', 'Swetha', 'Krishna', 'Kiran', 'Devaraj','Saranya','Hari','Aswathi','Selva'];
  const priorities = ['High', 'Medium', 'Low']; 

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    console.log(`Selected date: ${e.target.value}`);
  };

  return (
    <>
      <div className='dashboard-container'>
        <Navbar />
        {update && <div className="alert-message-position">Saved Successfully!</div>}

        <div className='content'>
          <div className='ready-check'>Checklist Name</div>
          <div className='first-fill'> 
          <button> Date:   <input 
                type="date" 
                value={selectedDate}
                onChange={handleDateChange} 
                className="date-picker" 
              /></button>

              <button onClick={handlePriorityClick} className="priority-label">Priority: {selectedPriority || 'Select'}</button> 
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
            )} </div>

            <br/> <br/>
          
          
          <br />
          <br />
          <button className='add-position'>Add Items</button>
          <div className='sky-position'>
            <table className='item-header'>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Checklist Items</th>
                  <th>Description</th>
                  <th> Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>fix the bug</td>
                  <td><textarea></textarea></td>
                  <td> <button>  <FontAwesomeIcon icon={faPen} /></button> <button> <FontAwesomeIcon icon={faTrash} /></button></td>
                </tr>
              </tbody>
            </table>

            <br />

            <div className='ad'>
           
              <p onClick={handleUpdate}>Save</p>
              <p onClick={handleShared}>Assign to</p>
            </div>
            {dropdownVisible && (
              <div className="dropdown">
                {users.map((user, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectUser(user)}
                    className="dropdown-option"
                  >
                    {user}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedUser && <div className="selected-user-assign">Checklist Assigned to: {selectedUser}</div>}
      </div>
    </>
  );
};

export default Checklist;
