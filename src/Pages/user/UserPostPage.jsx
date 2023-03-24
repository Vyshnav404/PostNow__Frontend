import React from 'react';
import '../css/userHome.css'
import PhotoPostComponent from '../../components/UserComponent/UserPhotoPost/PhotoPostComponent';
import Header from '../../components/UserComponent/UserHeader/Header';
import Widget from '../../components/UserComponent/UserWidget/Widget';
import Sidebar from '../../components/UserComponent/UserSidebar.jsx/Sidebar';

function UserPostPage() {
  return (
    <div className='userHome'>
      <Header />
      <div className='home__contents container-fluid' >

        <div className='side__bar col-md-3'>
      <Sidebar />
        </div>

      <div className='col-md-6 col-lg-5 col-sm-12'>
      <PhotoPostComponent />
      </div>

      <div className='col-md-3'>
      <Widget />
      </div>

      </div>
    </div>
  )
}

export default UserPostPage
