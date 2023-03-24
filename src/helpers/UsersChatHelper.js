import axios from "axios";

export const getUser = async(friendId,tokenData)=>{
    try {
        const getUser = await axios({
            url:'/getfriend/'+friendId,
            method:"get",
            headers:{
                Authorization:tokenData
            }


        })
        return getUser.data
    } catch (error) {
        console.log(error);
    }
}