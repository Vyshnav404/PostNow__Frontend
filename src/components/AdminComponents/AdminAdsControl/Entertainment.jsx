import React from 'react'
import { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import Navbar from '../AdminDashboard/Navbar'
import styled from 'styled-components'
import scrollreveal from 'scrollreveal'
import CreateAd from './CreateAd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllAds } from '../../../redux/features/adsSlice'
import toast,{ Toaster } from 'react-hot-toast'

function Entertainment() {
  const dispatch = useDispatch()
  const { allAds } = useSelector(state => state.ads)
  const { adminToken } = useSelector(state => state.admin)

const getAds = async()=>{
  try {
    await axios.get("/admin/adsdetails",{
      headers:{
        Authorization:adminToken
      }
    }).then((res)=>{
      dispatch(setAllAds(res.data))
    })
  } catch (error) {
    console.log(error);
  }
}

useEffect(()=>{
  getAds();
},[])

    useEffect(() => {
        const sr = scrollreveal({
          origin: "bottom",
          distance: "80px",
          duration: 2000,
          reset: false,
        });
        sr.reveal(
          `
            nav,
            .row__one,
            .row__two
        `,
          {
            opacity: 0,
            interval: 100,
          }
        );
      }, []);


      const DeleteAds = async(id)=>{
        try {
          await axios.delete("/admin/adsdelete/"+id).then((res)=>{
            toast.success("Ad deleted")
            getAds()
          })
        } catch (error) {
          console.log(error);
        }
      }

      const columns = [
        {
          name:"Ad Title",
          selector:(row)=> row.title,
          sortable:true,
        },
        {
          name:"Ad Description",
          selector:(row) => row.description,
        },
        {
          name:"Ad Image",
          selector: (row) => <img src={ row.imageUrl} width="75px" height="75px"/>,
        },
        {
          name:"Action",
          selector: (row) => (
            <button
            className='btn btn-danger'
            onClick={()=> DeleteAds(row._id)}
            >Delete</button>
          )
        }
      ]

  return (
    <div>
        <Section>
        <Navbar />
        <div className='mt-5' >
        <CreateAd />
        <DataTable 
        title={"Ads Management"}
        columns={columns}
        pagination
        data={allAds}
        highlightOnHover
        fixedHeader
        />

        </div>
        
        </Section>
        <Toaster />
    </div>
  );
};

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;

export default Entertainment;
