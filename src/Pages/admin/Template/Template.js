
import React, { useState } from 'react';
import '../../admin/Template/Template.css';
import Navbar from '../../../Pages/admin/Navbar/Navbar';
import { Checkbox, Menu, MenuItem } from '@mui/material';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Template = () => {
  const [update, setUpdated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); 
  const [sharedUser, setSharedUser] = useState(''); 

  
  const handleUpdate = () => {
    setUpdated(true);
    setTimeout(() => setUpdated(false), 3000);
  };

 
  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

 
  const handleSelectUser = (user) => {
    setAnchorEl(null);
    setSharedUser(user); 
  };

  return (
    <>
      <div className='dashboard-container'>
        <Navbar />
        {update && <div className="alert-message-position">Updated Successfully!</div>}
        {sharedUser && <div className="alert-message-position">Checklist is shared with {sharedUser}!</div>}

        <h2 className='template'>Daily Checklist</h2> 
        <button className='items-position'>Add Items</button>

        <div className='back-position'>
          <table className='template-position'>
            <tr>
              <th>S.No</th>
              <th>Checklist Items</th>
              <th>Type</th>
              <th>Comments</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>1.</td>
              <td>Daily ClockIn</td>
              <td>
                <Checkbox /> Yes <Checkbox /> No
              </td>
              <td><textarea /></td>
              <td>
                <button><FontAwesomeIcon icon={faPen} /> </button>
                <button><FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
            <tr> 
         <td> 2.</td>
         <td> Monday Meeting </td>
         <td> <Checkbox/> Yes  <Checkbox/> No  </td>
         <td> <textarea/> </td>
         <td>  <button>  <FontAwesomeIcon icon={faPen} />  </button>
                     <span></span>
                         <button> <FontAwesomeIcon icon={faTrash} /> </button> </td>

       </tr>
       <tr> 
         <td> 3.</td>
         <td> Workdone email</td>
         <td> <Checkbox/> Yes  <Checkbox/> No  </td>
         <td> <textarea/> </td>
         <td>  <button>  <FontAwesomeIcon icon={faPen} /> </button>
                     <span></span>
                         <button><FontAwesomeIcon icon={faTrash} /> </button> </td>

       </tr>
       <tr> 
         <td> 4.</td>
         <td> Daily Clockout</td>
         <td> <Checkbox /> Yes  <Checkbox/> No  </td>
         <td> <textarea/> </td>
         <td>  <button>  <FontAwesomeIcon icon={faPen} />  </button>
                     <span></span>
                         <button> <FontAwesomeIcon icon={faTrash} /> </button> </td>

       </tr>

      <tr> 
         <td> 5.</td>
         <td> No of tasks completed </td>
         <td> <input  />  </td>
         <td> <textarea/> </td>
         <td>  <button>  <FontAwesomeIcon icon={faPen} /> </button>
                 <span></span>
                      <button> <FontAwesomeIcon icon={faTrash} /> </button> </td>

       </tr>
            
          </table>
        </div>
        

        <div className='same-line'>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleShareClick}>Share to</button>

         
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleSelectUser(' All')}> All</MenuItem>
            <MenuItem onClick={() => handleSelectUser('Aswin')}>Aswin</MenuItem>
            <MenuItem onClick={() => handleSelectUser('Amal')}>Amal</MenuItem>
            <MenuItem onClick={() => handleSelectUser('Saranya')}>Saranya</MenuItem>
            <MenuItem onClick={() => handleSelectUser('Swetha')}>Swetha</MenuItem>
            <MenuItem onClick={() => handleSelectUser('Devaraj')}>Devaraj</MenuItem>
            <MenuItem onClick={() => handleSelectUser('Hari')}>Hari</MenuItem>
            <MenuItem onClick={() => handleSelectUser('Krishna')}>Krishna</MenuItem>
            <MenuItem onClick={() => handleSelectUser('Kiran')}>Kiran</MenuItem>
            <MenuItem onClick={() => handleSelectUser('Aswathi')}>Aswathi</MenuItem>
            <MenuItem onClick={() => handleSelectUser('Selva')}>Selva</MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Template;
