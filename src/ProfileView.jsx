

import React,{useEffect,useState} from "react"
import api from "./interceptor"


const ProfileView=()=>{

    useEffect(()=>{
        api.get('/blogProfileDetails')
    },[])
    

    return (
        <div>
        <div className="h-screen  bg-gray-100 pt-12">
         {/* Card start */}
         <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
             <div className=" px-4 pb-6">
                 <div className=" text-center my-4">
                     <div className="flex justify-center  ">
                     <img
                         className="h-32 w-32 rounded-full border-4 border-white mx-auto my-4"
                         src="https://randomuser.me/api/portraits/women/21.jpg"
                         alt="Cait Genevieve"
                     />
                     
    
</div>
                     <div className="py-2">
                         <h3 className="font-bold text-2xl text-gray-800  ">Cait Genevieve</h3>
                         <div className="inline-flex text-gray-700  items-center mt-1">
                             {/* <svg
                                 className="h-5 w-5 text-gray-400  mr-1"
                                 fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24"
                                 width="24"
                                 height="24"
                             >
                                 <path d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                             </svg> */}
                             Full Stack Developer,India
                         </div>
                         
                     </div>
                 </div>
                 <div className="flex gap-2 px-2">
                 {/* <button className="flex-1 rounded-full border-2 border-gray-400  font-semibold text-black  px-4 py-2" onClick={navigateDraft}>
                         Draft
                     </button> */}
                     <button className="flex-1 rounded-full border-2 border-gray-400  font-semibold text-black  px-4 py-2" >
                         Count : 23
                     </button>
                     {/* <button className="flex-1 rounded-full border-2 border-gray-400  font-semibold text-black  px-4 py-2" onClick={navigatePublished}>
                         Published
                     </button> */}
                 </div>
             </div>
             


            



         </div>
       
     </div>
  

     </div>
    )
}

export default ProfileView