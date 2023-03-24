import React, {useState, useEffect } from 'react'
import './WidgetContent.css'
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios'
import { useSelector } from "react-redux";

function WidgetContent() {
  
  const [carousalData,setCarousalData] = useState([])
  const { tokenData } = useSelector(state => state.user)

  const getData = async()=>{
    try {
      await axios.get("/getcarousaldata",{
        headers:{
          Authorization:tokenData
        }
      }).then((res)=>{
        setCarousalData(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getData();
  },[])

  
  return (
    <div className='widget__contents'>
        {/* <div className='widget__content'>
            <img src="https://i.shgcdn.com/ded50c02-85f1-4c4c-9338-56e91df452a6/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt="" />
            <div className='widget__contentTitle'>
                <h5>Mobile App Programmer</h5>
                <p>The best Mobile App Development Company</p>
            </div>
        </div> */}

<Carousel>
      
  {
    carousalData.map(item => (
      <Carousel.Item>
        <img
          className="d-block"
          src={item?.imageUrl}
          alt="Second slide"
          style={{width:'20vw',height:'30vh'}}
        />

        <Carousel.Caption>
          <h3>{item?.title}</h3>
          <p>{item?.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))
  }
    </Carousel>

    </div>
  )
}

export default WidgetContent
