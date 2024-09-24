import React from 'react'
import '../../admin/Notification/Notification.css';
import Navbar from '../../../Components/Navbar';


const Notification = () => {
  return (
    <>
     <div className='dashboard-container'> 
    <Navbar/>
  
    <h2 className='notify'> Notification</h2>
    
    <div className='okay'>  
    <h3 className='data'> From UserName: </h3>
    <div> Checklist 1 Completed </div>
      </div>
    </div>
   
   
    </>
  )
}

export default Notification



