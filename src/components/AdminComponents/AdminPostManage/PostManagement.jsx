import React from 'react'
import { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import Navbar from '../AdminDashboard/Navbar'
import styled from 'styled-components'
import scrollreveal from 'scrollreveal'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setReportPost }from '../../../redux/features/reportPostSlice'
import PostShowModal from './PostShowModal'
import toast,{ Toaster } from 'react-hot-toast'

function PostManagement() {
const { reportedPost } = useSelector(state => state.reportPost)
const { adminToken } = useSelector(state => state.admin)
const dispatch = useDispatch();

const getReportedPost = async()=>{
    try {
        await axios.get("/admin/getreportpost",{
          headers:{
            Authorization:adminToken
          }
        }).then((res)=>{
      dispatch(setReportPost(res.data))
        })
    } catch (error) {
        console.log(error);
    }
}


useEffect(()=>{
    getReportedPost();
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

      const postDelete = async(id)=>{
        try {
          await axios.delete(`/admin/post-delete/${id}`).then(async(res)=>{
              toast.success('Deleted')
            await getReportedPost();

          })
        } catch (error) {
          console.log(error);
        }
      }


    const columns = [
        {
            name:"Post",
            selector:(row) => <PostShowModal row={row._id} />,
            sortable:true,
        },
        {
            name:"UserName",
            selector:(row) => row.user.firstName,
        },
        {
            name:"UserEmail",
            selector: (row) => row.user.email
        },
        {
            name:"Actions",
            selector: (row)=>(
                <button className='btn btn-danger'
                onClick={()=>postDelete(row._id)}
                 >Delete</button>
            )
        }
    ]  

  return (
    <div>
        <Section>
            <Navbar />
            <div className='mt-5'>
            <DataTable 
            title={"Reported Posts"}
            columns = {columns}
            pagination
            data={reportedPost}
            highlightOnHover
            fixedHeader
            />
            </div>
        </Section>
        <Toaster />
      
    </div>
  )
}

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

export default PostManagement
