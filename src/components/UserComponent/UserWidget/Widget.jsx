import React from 'react'
import WidgetContent from './WidgetContent'
import './Widget.css'
import HotQuestions from './HotQuestions'

function Widget() {
  return (
    // <>
    // <div className='top'>
    
    
    // <div style={{flex:'0.2',width:'20vw',height:"25vh"}} className='widget col-md-12'>
    

    //   <div className='widget__header'>
    //     <h5>Space to follow</h5>
    //   </div>
    //   <div className='widget__contents'>
    //     <WidgetContent />
    //   </div>
    // </div>



    // <div className='col-md-12'> 
    // <HotQuestions />
    // </div>

    // </div>
    // </>
    <>
    <div className="main">
      <div className="widget">
      <h5 style={{textAlign:'center'}}>Space to follow</h5>  
      <WidgetContent />
          </div>
      <div className="right mt-3">
     < HotQuestions />
      </div>
    </div>
    </>
  )
}

export default Widget
