import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './interceptor';

import { FaSignOutAlt ,FaUserCircle , FaUserCog} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { removeUserCredential } from './store/authSlice';


const App=()=>{


   const [allBlogs,setAllBlogs]=useState(null)
   const [userId,setUserId]=useState()

   const navigate = useNavigate();
   const dispatch=useDispatch()

     
  useEffect(()=>{
    api.get("/getAllBlogs")
    .then((res)=>{
      if(res.data.response){
       
        setAllBlogs(res.data.response)
        setUserId(res.data.userId)
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
    navigate('/blog')

    
  }
  const goToUserDetails=()=>{
    navigate('/goToProfile')
   
  }


  const navigateToLogout=()=>{




      dispatch(removeUserCredential())

    
      
  }

  return (
    <div className="bg-zinc-100 ">
    <div>
  <nav className="bg-white fixed top-0 left-0 w-full z-50">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="https://flowbite.com/" className="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Blogging</span>
      </a>
     
      <div className="flex items-center md:order-2 space-x-3 md:space-x-0">
        <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
        >
          <span className="sr-only">Open user menu</span>
          <img className="w-8 h-8 rounded-full" onClick={goToPorfile}  alt="user photo" />
        </button>
        <button  className='pl-10'>  <FaUserCog size={24}  onClick={goToUserDetails} /></button>
        <button className='pl-5' onClick={navigateToLogout}>
         <FaSignOutAlt />
      </button>

        {/* Dropdown menu */}
      </div>
      {/* <div
        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-user"
      >
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
              aria-current="page"
            >
              Home 
            </a>
          </li>
        </ul>
      </div> */}

    

    </div>
  
  </nav>
 
 
</div>

      



       <section >
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 mt-10">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-black">
            Our Blog
          </h2>
          <p className="font-light text-black sm:text-xl">
            We use an agile approach to test assumptions and connect with the needs of your audience early and often.
          </p>
        </div>



       
      </div>
    </section>

    <div className="flex justify-center flex-wrap gap-0 ">











<div className="w-[800px]  mb-40 ">
          {allBlogs&&allBlogs.map((a,b)=>{
            return (
           

         <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            <div className="flex justify-between items-center mb-5 text-gray-500">
              <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded  ">
                <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                </svg>
                Tutorial
              </span>
              {console.log(a._id,userId)}

              {a.userId._id==userId ? <div>

              <svg onClick={()=>navigateToEditBlog(a._id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <path d="M3 21v-3.59l11.3-11.29 3.59 3.59L6.59 21H3zm16.71-16.71a1.004 1.004 0 0 0-1.42 0l-2.88 2.88 3.59 3.59 2.88-2.88a1.004 1.004 0 0 0 0-1.42l-2.17-2.17z"/>
</svg>


              </div>:
              
              <span className="text-sm"> </span>}
            </div>7
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              <p onClick={()=>navigateToSinglePage(a._id)} >{a.title}</p>
            </h2>
            <p className="mb-5 font-light text-black">
              {a.description}
              {/* Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers. */}
            </p>
            <div className="flex justify-center ">
            {a.image&&<img src={a.image}  className=" h-[300px] w-[300px]"  />}
            </div>
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












{/* 


        <div className="w-[800px]  mt-3">
   
   
   <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
     <div className="flex justify-between items-center mb-5 text-gray-500">
       <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded  ">
         <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
           <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
         </svg>
         Tutorial
       </span>
      
     </div>
     <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
       <a href="#">How to quickly deploy a static website</a>
     </h2>
     <p className="mb-5 font-light text-black">
       Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers.
     </p>
     <div className="flex justify-between items-center">
       <div className="flex items-center space-x-4">
         <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
         <span className="font-medium">Jese Leos</span>
       </div>
       <a href="#" className="inline-flex items-center font-medium text-primary-600  hover:underline">
         Read more
         <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
           <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
         </svg>
       </a>
     </div>
   </article>
 </div>
 <div className="w-[800px]  mt-3 ">
   
   
          <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
            <div className="flex justify-between items-center mb-5 text-gray-500">
              <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded  ">
                <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                </svg>
                Tutorial
              </span>
              <span className="text-sm">14 days ago</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              <a href="#">How to quickly deploy a static website</a>
            </h2>
            <p className="mb-5 font-light text-black">
              Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                <span className="font-medium">Jese Leos</span>
              </div>
              <a href="#" className="inline-flex items-center font-medium text-primary-600  hover:underline">
                Read more
                <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </article>
        </div> */}





    </div>
    </div>
  )
}

export default App