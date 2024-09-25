


import React ,{useState,useEffect }from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Navigate,useNavigate} from "react-router-dom"



const ProtectedRoute=({children})=>{

    const user=useSelector((state)=>state.auth.userInfo)
    
    {console.log("usrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")}
    {console.log(user)}
    return (
        <div>

{!user&&!user?(children ):(<Navigate to='/'/>)}

        </div>
    )
}
export default ProtectedRoute