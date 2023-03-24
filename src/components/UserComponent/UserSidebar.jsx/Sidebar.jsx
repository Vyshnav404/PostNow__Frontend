import React from 'react'
import AddPhotoPost from '../UserPhotoPost/AddPhotoPost';
import './Sidebar.css';
import LeftSidebar from './LeftSidebar';

// import SidebarOptions from './SidebarOptions';

function Sidebar() {
  return (
    <>
    <div style={{position:'fixed',maxWidth:'300px'}} >
      <div className='mb-2'> 
      <AddPhotoPost />
      </div>

      {/* <SidebarOptions /> */}
      <div 
      className="questions--LeftSidebar  border "
      style={{ fontSize: "14px",
      height: "627px",
      paddingTop: "13px" ,border:'1px solid black'}}
      > 
      <LeftSidebar />
      </div>


    </div>
    </>
  )
}

export default Sidebar
