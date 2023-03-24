import React from 'react'
import Feed from '../../components/UserComponent/UserFeed/Feed'
import Header from '../../components/UserComponent/UserHeader/Header'
import Sidebar from '../../components/UserComponent/UserSidebar.jsx/Sidebar'
import Widget from '../../components/UserComponent/UserWidget/Widget'
import '../css/userHome.css'

function UserHome() {
  return (
    <div className='userHome'>
        <Header />
        <div className='home__contents container-fluid'>
          <div className='home__content row' >
            <div className="side__bar col-md-3">
            <Sidebar />
            </div>
            <div className="col-md-6 col-lg-5 col-sm-12"> 
            <Feed />
            </div>
            <div className="col-md-3">
            <Widget />
            </div>
          </div>
        </div>
    </div>
  )
}

export default UserHome
