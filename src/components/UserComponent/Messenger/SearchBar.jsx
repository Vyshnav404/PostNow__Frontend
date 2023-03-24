import React, { useEffect, useState } from "react";
import "./searchBar.css";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsersDetails } from "../../../redux/features/userSlice";

function Search() {
  const { tokenData,allUsersDetails } = useSelector((state) => state.user);
  const [displayBox, setDisplayBox] = useState(true)
  const [filterData, setFilterData] = useState([])
  const [displayUsers, setDisplayUsers]= useState(true)
  const { userDetails } = useSelector(state => state.user)
  const dispatch = useDispatch();
  let userId = userDetails._id

  useEffect(() => {
    (async () => {
      await axios
        .get("/takealluser", {
          headers: {
            Authorization: tokenData,
          },
        })
        .then((res) => {
          dispatch(setAllUsersDetails(res.data));
        });
    })();
  }, []);


// filter users 
  const handleFilter = (event) => {
    setDisplayBox(true);
    const searchWord = event.target.value;
    const newFilter = allUsersDetails.filter((value)=>{
      return value.firstName.toLowerCase().includes(searchWord.toLowerCase())
    })
    setFilterData(newFilter)
  }

  const onClickUser = async(id)=>{
    try {
      const filteredUserData = allUsersDetails.filter(
        (value)=> value._id == id
      );
      let friendId = filteredUserData[0]._id
     let chat =  await axios.post('/conversation/create-conversation',{userId,friendId})
      setDisplayUsers(false);
      setDisplayBox(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" 
        placeholder="Search users" 
        onChange={handleFilter}/>
        <div className="searchIcon">
          <BiSearchAlt2 />
        </div>
      </div>

      <div className="dataBox">
        {
          displayBox && (
            <div className="dataBox">
              {
                filterData.length != 0 && (
                  <div className="dataResult">
                    {
                      filterData.slice(0,15).map((value,key)=>{
                        return(
                          <a 
                           className="dataItem"
                           onClick={()=> onClickUser(value._id)}
                           >
                            <p>{value?.firstName}</p>
                           </a>
                        )
                      })
                    }
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Search;
