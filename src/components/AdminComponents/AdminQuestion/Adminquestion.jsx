import React, { useEffect, useState } from 'react'
import Navbar from '../AdminDashboard/Navbar'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import styled from 'styled-components';
import scrollreveal from 'scrollreveal';
import QuestionShowModal from './QuestionShowModal';
import { useSelector } from 'react-redux';

function Adminquestion() {

    const { adminToken }=useSelector(state => state.admin)
   const [ report, setReport] = useState([])
    const getReportQuestions = async()=>{
        await axios.get('/admin/getreportQuestion',{
          headers:{
            Authorization:adminToken
          }
        }).then((res)=>{
          setReport(res.data)
        })
    }
    
    useEffect(()=>{
        getReportQuestions();
    },[])
     

      const questionDelete = async(qid)=>{
        console.log(qid,"qid qid qid qid ")
        await axios.delete(`/admin/question-delete/${qid}`).then(async(res)=>{
        await axios.get('/admin/getreportQuestion',{
          headers:{
            Authorization:adminToken
          }
        }).then((res)=>{
            setReport(res.data)
          })
        })
      }

    const columns =[
        {

            name :"Question ID",
            selector: (row) => <QuestionShowModal row={row._id} />,
            sortable:true,
        },
        {
            name:"User Name",
            selector:(row) => row.user.firstName, 
        },
        {
            name:"Email",
            selector: (row) => row.user.email
        },
        {
            name:"Actions",
            selector: (row)=>(
                <button className='btn btn-danger'
                onClick={()=>questionDelete(row._id)} >Delete</button>
            )
        }

    ]

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
  return (
    <div>
      <Section>
        <Navbar />
        <DataTable  title={"Questions"}
         columns = {columns}
         data= {report}
         />

      </Section>
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

export default Adminquestion
