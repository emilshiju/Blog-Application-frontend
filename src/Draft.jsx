import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './interceptor';




const Draft=()=>{

    
   const [allBlogs,setAllBlogs]=useState(null)
   const [userId,setUserId]=useState()

   const navigate = useNavigate();

     
  useEffect(()=>{
    api.get("/getAllDraft")
    .then((res)=>{
      if(res.data.response){
       
        setAllBlogs(res.data.response)
        
      }
    })
  },[])


  const navigateToSinglePage=(blogId)=>{
    navigate(`/singeBlogPage/${blogId}`)
    
  }

  const navigateToEditBlog=(blogId)=>{
    navigate(`/editBlog/${blogId}`)
  }

 

  const goToPorfile=()=>{

    navigate('/goToProfile')
  }

    return (

        <div className="bg-white ">
    <div>



 
 
</div>

      



       <section >
      {/* <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 mt-10">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        
        </div>



       
      </div> */}
    </section>

    <div className="flex justify-center mt-32gap-0 mb-32 ">











<div className="w-[800px]  ">
          {allBlogs&&allBlogs.map((a,b)=>{
            return (
           

         <article className="p-6 mt-10 bg-white rounded-lg border border-gray-200 shadow-md">
            <div className="flex justify-between items-center mb-5 text-gray-500">
              <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded  ">
                <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                </svg>
                Tutorial
              </span>
            
 <div>

              <svg onClick={()=>navigateToEditBlog(a._id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M3 21v-3.59l11.3-11.29 3.59 3.59L6.59 21H3zm16.71-16.71a1.004 1.004 0 0 0-1.42 0l-2.88 2.88 3.59 3.59 2.88-2.88a1.004 1.004 0 0 0 0-1.42l-2.17-2.17z"/>
</svg>


              </div>
            </div>7
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              <p onClick={()=>navigateToSinglePage(a._id)} >{a.title}</p>
            </h2>
            <p className="mb-5 font-light text-black">
              {a.description}
              {/* Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers. */}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                <span className="font-medium">{a.userId.userName}</span>
              </div>
              <p onClick={()=>navigateToSinglePage(a._id)} className="inline-flex items-center font-medium text-primary-600  hover:underline">
                Read more
                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </p>
            </div>
            
          </article>
       
          ) })}
        </div>

      


    </div>
    </div>
    )


}

export default Draft