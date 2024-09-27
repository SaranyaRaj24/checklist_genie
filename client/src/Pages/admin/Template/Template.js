
import React, { useState } from 'react';
import '../../admin/Template/Template.css';
import Navbar from '../../../Pages/admin/Navbar/Navbar';
import { Menu, MenuItem } from '@mui/material';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


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
      <td><FormControl>
        <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        >
        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
        
      </RadioGroup>
      </FormControl></td>
             
              <td><textarea /></td>
              <td>
                <button><FontAwesomeIcon icon={faPen} /> </button>
                <button><FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
            <tr> 
         <td> 2.</td>
         <td> Monday Meeting </td>
         <td>         <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
        
      </RadioGroup>
      </FormControl></td>
         <td> <textarea/> </td>
         <td>  <button>  <FontAwesomeIcon icon={faPen} />  </button>  <span></span>  <button> <FontAwesomeIcon icon={faTrash} /> </button> </td>
       </tr>
       <tr> 
         <td> 3.</td>
         <td> Workdone email</td>
         <td>         <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
        
      </RadioGroup>
      </FormControl></td>
         <td> <textarea/> </td>
         <td>  <button>  <FontAwesomeIcon icon={faPen} /> </button> <span></span>  <button><FontAwesomeIcon icon={faTrash} /> </button> </td>
                     
                        

       </tr>
       <tr> 
         <td> 4.</td>
         <td> Daily Clockout</td>
         <td>         <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
        
      </RadioGroup>
      </FormControl></td>
         <td> <textarea/> </td>
         <td>  <button>  <FontAwesomeIcon icon={faPen} />  </button>  <span></span> <button> <FontAwesomeIcon icon={faTrash} /> </button> </td>
                    
       </tr>

      <tr> 
         <td> 5.</td>
         <td> No of tasks completed </td>
         <td> <input  />  </td>
         <td> <textarea/> </td>
         <td>  <button>  <FontAwesomeIcon icon={faPen} /> </button> <span></span>   <button> <FontAwesomeIcon icon={faTrash} /> </button> </td>
       </tr>     
        </table>
        </div>

        <div className='same-line'>
          <button> Date  <input type='date'/></button>  
          <button onClick={handleUpdate}>Save</button>
          <button onClick={handleShareClick}>Share to</button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}>
            <MenuItem className='' onClick={() => handleSelectUser(' All')}> Public </MenuItem>

          
          </Menu>  
          
        </div>;
 
      </div>
    </>
  );
};

export default Template;
