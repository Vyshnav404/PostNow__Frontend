import React from 'react'
import './SidebarOption.css'
import { Add } from '@material-ui/icons'

function SidebarOptions() {
  return (
    <div className='sidebarOptions '>
      <div className='sidebarOption'>
        <img src="https://thumbs.dreamstime.com/b/focus-history-magnifying-glass-focusing-history-word-business-concept-135515904.jpg" 
        alt="" />
        <p>History</p>
      </div>

      <div className='sidebarOption'>
        <img src="https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?cs=srgb&dl=pexels-nappy-936137.jpg&fm=jpg" 
        alt="" />
        <p>Bussiness</p>
      </div>

      <div className='sidebarOption'>
        <img src="https://img.freepik.com/free-vector/people-connecting-jigsaw-pieces-head-together_53876-64617.jpg?w=2000" 
        alt="" />
        <p>Psychology</p>
      </div>

      <div className='sidebarOption'>
        <img src="https://img.freepik.com/free-photo/woman-chef-cooking-vegetables-pan_1303-22287.jpg?w=2000" 
        alt="" />
        <p>Cooking</p>
      </div>

      <div className='sidebarOption'>
        <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8&w=1000&q=80" 
        alt="" />
        <p>Music</p>
      </div>

      <div className='sidebarOption'>
        <img src="https://leverageedu.com/blog/wp-content/uploads/2020/05/Science-Quotes.jpg" 
        alt="" />
        <p>Science</p>
      </div>

      <div className='sidebarOption'>
        <img src="https://etimg.etb2bimg.com/photo/75859332.cms" 
        alt="" />
        <p>Health</p>
      </div>

      <div className='sidebarOption'>
        <img src="https://media.istockphoto.com/id/1271522601/photo/pop-corn-and-on-red-armchair-cinema.jpg?s=612x612&w=0&k=20&c=XwQxmfrHb-OwV5onPUW5ApB4RaGBK7poSIzZj4q_N_g=" 
        alt="" />
        <p>Movies</p>
      </div>
      <div className='sidebarOption'>
        <Add />
        <p className='text'>Discover Spaces</p>
      </div>

    </div>
  )
}

export default SidebarOptions
