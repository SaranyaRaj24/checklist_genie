import React from 'react'
import Navbar from '../../../Components/Navbar';
import '../Details/Details.css';




const Details = () => {

  return (
    <> 
     <div className='dashboard-container'> 
    <Navbar/>
    <h2 className='task-allignment'> Checklist Details</h2>
    <div className='details-outline' > 
   
    <table className='table-width'>
                <thead>
                  <tr> 
                    <th>S.No</th>
                    <th>Assigned Checklist</th>
                    <th> Priority</th>
                    <th>Completed Checklist</th>
                    <th>Pending Checklist</th>
                    <th>Comments</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr> 
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr>
                  
                    
                </tbody>
              </table>
              </div>
            
    </div>
    </>
  )
}

export default Details

