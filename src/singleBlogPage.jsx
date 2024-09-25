

import { useEffect , useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './interceptor';



const SingleBlogPage=()=>{

    
    const { blogId } = useParams();


    const [title, setTitle] = useState()
      const [fullDescription,setFullDescription]=useState()
      const [filetPath,setFilePath]=useState()


      useEffect(()=>{

        api.get(`/getSingleBlog/${blogId}`)
        .then((res)=>{
            setTitle(res.data.blogDetails.title)
            setFullDescription(res.data.blogDetails.description)
            setFilePath(res.data.blogDetails.image)
        })
      },[])


      


    return (
        <div>


<div className="mt-20 text-center">
            {title&&<p
              
              
                className="font-bold text-center text-6xl  border-gray-300 focus:outline-none focus:border-blue-500"
            > {title}</p>}
        </div>



  <div className="flex flex-col items-center justify-center h-full mt-20">
    {/* <button
   
      className="mb-2 p-2 bg-white rounded-full shadow-md ml-56"
      aria-label="Close"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button> */}
    {filetPath&&<img className="w-[250px] h-[250px]"  alt="Description"  src={filetPath} />}
  </div>

  <div className="flex justify-center">
    <div className="p-4 md:p-5 w-96 h-96">
     
      <div className="mt-4 p-2  border-gray-300 rounded">
        {/* <h2 className="text-lg font-semibold">Description:</h2> */}
        {fullDescription&&<p className="text-2xl leading-relaxed text-gray-700">
          {fullDescription}
        </p>}
      </div>
    </div>
  </div>





        </div>
    )
}
export default SingleBlogPage