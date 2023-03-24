import React from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect } from "react";
import Navbar from "../AdminDashboard/Navbar";
import styled from "styled-components";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import toast, { Toaster } from "react-hot-toast";
import { setUsers } from "../../../redux/features/completeUserSlice";
import { useDispatch, useSelector } from "react-redux";
import scrollreveal from "scrollreveal";
import swal from 'sweetalert'

const UserManage = () => {
  const [details, setDetails] = useState([]);
  const dispatch = useDispatch();
  const { usersDetails } = useSelector((state) => state.allUsers);
  const { adminToken } = useSelector((state) => state.admin);

  const getUserDetails = async () => {
    try {
      await axios.get("/admin/userdetails",{
        headers:{
          Authorization:adminToken,
        }
      }).then((response) => {
        setDetails(response.data);
        dispatch(setUsers(response.data));
      });
    } catch (error) {
      console.log(error); 
    }
  };

  
  //  start
  const userBlock = async(id)=>{
    swal({
      title: "Are you sure?",
      text: "Do you want to block the user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
         axios.put("/admin/block-user/" + id).then((response) => {
          console.log(response);
          // toast.error("User Blocked");
  
          axios.get("/admin/userdetails",{
            headers:{
              Authorization:adminToken
            }
          }).then((res) => {
            dispatch(setUsers(res.data));
          });
        });
        swal("You blocked the user!", {
          icon: "success",
        });
      } else {
        swal("Action not done!");
      }
    });
  }
 
  // eeennnd



    // let userBlock= async(id)=>{
    //   try {
    //       await fetch("http://localhost:8080/admin/block-user/" + id,{
    //         method:"PUT",
    //         headers:{
    //           Authorization:adminToken
    //         },
    //       })
    //   } catch (error) {
    //     console.log("fffffffffffff ",error)
    //   }
    
    // }
   
  
  const userUnBlock = async (id) => {
    try {
      await axios.put("/admin/unblock-user/" + id).then((response) => {
        console.log("unblock success");
        toast.success("user unblocked");

        axios.get("/admin/userdetails",{
          headers:{
            Authorization:adminToken,
          }
        }).then((res) => {
          dispatch(setUsers(res.data));
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const columns = [
    {
      name: "Users Name",
      selector: (row) => row.firstName,
      sortable:true,
    },
    {
      name: "Users email",
      selector: (row) => row.email,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          {row?.isBlocked != true ? (
            <button
              className="btn btn-danger"
              onClick={() => userBlock(row._id)}
            >
              Block
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => userUnBlock(row._id)}
            >
              Unblock
            </button>
          )}
        </>
      ),
    },
  ];

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
        <DataTable
          title={"User Details"}
          columns={columns}
          data={usersDetails}
          pagination
          highlightOnHover
          fixedHeader
         
        />
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

export default UserManage;
