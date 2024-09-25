import { useEffect ,useState} from "react"
import { useNavigate } from 'react-router-dom';

import api from "./interceptor";

const Profile=()=>{
    const navigate=useNavigate()
    const [profileDetails,setProfileDetails]=useState(null)


    const onCreateBlog=()=>{
        navigate('/createBlog')

    }


    useEffect(()=>{
        api.get('/blogProfileDetails')
        .then((res)=>{
            if(res.data.response){
                setProfileDetails(res.data.response)
            }
        })
    },[])
    



    const navigateDraft=()=>{
        navigate('/draft')
    }

    const navigatePublished=()=>{
        navigate('/published')
    }
    
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
                            {profileDetails&&<h3 className="font-bold text-2xl text-gray-800  ">{profileDetails.name}</h3>}
                            {profileDetails&&<div className="inline-flex text-gray-700  items-center mt-1">
                               
                               {profileDetails.job}
                            </div>}
                            
                        </div>
                    </div>
                    <div className="flex gap-2 px-2">
                    <button className="flex-1 rounded-full border-2 border-gray-400  font-semibold text-black  px-4 py-2" onClick={navigateDraft}>
                            Draft
                        </button>
                        <button className="flex-1 rounded-full border-2 border-gray-400  font-semibold text-black  px-4 py-2" onClick={onCreateBlog}>
                            Create
                        </button>
                        <button className="flex-1 rounded-full border-2 border-gray-400  font-semibold text-black  px-4 py-2" onClick={navigatePublished}>
                            Published
                        </button>
                    </div>
                </div>
                


               



            </div>
            {/* Card end */}
        </div>
     

        </div>
    )
}

export default Profile