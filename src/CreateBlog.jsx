


import { useState } from "react";
import { storage } from "./firebase";


import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import api from "./interceptor";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorage } from 'firebase/storage';

const CreateBlog=()=>{
    const [title, setTitle] = useState('Title  !');
    const [isOpen, setIsOpen] = useState(false);
    const [showDiscription,setShowDiscription]=useState(false)


    const [isLoading,setIsLoading]=useState(false)

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    const [description,setDiscription]=useState('Description')
    const [fullDescription,setFullDescription]=useState()
    const showDescriptionBox=()=>{
        setIsOpen(!isOpen)
        setShowDiscription(!showDiscription)
    }

    const clearFullDiscription=()=>{
        setFullDescription('')
    }

    const onSaveDiscription=()=>{
   toggleModal()
   setShowDiscription(true)

    }

    const [image,setImage]=useState(false)
    const [filetPath,setFilePath]=useState(null)
   
    const onChangeImage=(e)=>{
      const file = e.target.files[0]; // Get the selected file
        if (file) {
            const objectUrl = URL.createObjectURL(file); // Create Object URL
            setImage(objectUrl); // Set the Object URL as the image source
            setFilePath(file)
        }
    }

    const onClearImage=()=>{
      setImage(null)
    }


    




  const TitleValidation=()=>{
     
    // const TitleRegex = /^[a-zA-Z0-9\s'.,!?-]{5,100}$/;


    //     if(!TitleRegex.test(title)){

        
    //       toast.error('make a proper Title')

    //       return false
            
    //     }

        if(!title){
          toast.error(' Title is required')
          return false
        }
        return true

  }

  const DescriptionValidation=()=>{
   

    // const DescriptionRegex = /^.{10,5000}$/


    // if(!DescriptionRegex.test(fullDescription)){

    //   toast.error('Make a proper Description')
    //   return false

    // }

    if(!fullDescription){

      toast.error('description is requierd')

      return false
    }
    return true

  }

  const imageValidation=()=>{

    if(!filetPath){
      return false
    }
    return true
  }


  const onSubmitBlog=(status)=>{

   
    let descriptionStatus=DescriptionValidation()
    let titleStatus=TitleValidation()
    let imageStatus=imageValidation()

    

    if(descriptionStatus&&titleStatus&&imageStatus){


      setIsLoading(true)



      const onChangeUploadImageToFirebase = () => {
        console.log("iomageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        console.log(image)
  
        const storageRef = ref(storage, filetPath.name);
    
        uploadBytes(storageRef, filetPath).then((snapshot) => {
          console.log("Uploaded a blob or file!");
  
    
          getDownloadURL(snapshot.ref).then((downloadURL) => {
           
            console.log("downloded")
            console.log(downloadURL)
            api.post('/createBlog',{title,description:fullDescription,image:downloadURL,status})
            .then((res)=>{
              
                 setFullDescription('')
                 setTitle('Title  !')
                 setImage(false)
                 setFilePath(null)
                 setIsLoading(false)
                 toast.success('succesfuly created')




            })
        });
      
      })
    }

onChangeUploadImageToFirebase()  

   
    }else{

      if(descriptionStatus&&titleStatus){
        setIsLoading(true)


      api.post('/createBlog',{title,description:fullDescription,status})
      .then((res)=>{
        setFullDescription()
        setTitle('Title  !')
        setImage(false)
        setFilePath(null)
        setIsLoading(false)
        toast.success('succesfuly created')
      })
      }



    }


  }


    return (
        <div className="container mx-auto mt-10">
          <Toaster />
    <div className="flex justify-center">
        <h1 className="font-bold text-2xl">Create a Blog!</h1>
    </div>
    <div className="mt-20 text-center">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="font-bold text-center text-6xl border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
        </div>

        

        {!image&&<div className="flex w-full h-full items-center justify-center bg-grey-lighter mt-40">
    <label className="w-64 flex flex-col items-center justify-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-base leading-normal">Select a file</span>
        <input type="file" onChange={onChangeImage} className="hidden" />
    </label>
</div>}


{image && (
  <div className="flex flex-col items-center justify-center h-full mt-20">
    <button
      onClick={onClearImage} // Replace with your state management
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
    </button>
    <img className="w-[250px] h-[250px]" src={image} alt="Description" />
  </div>
)}








        <div className="flex justify-center flex-nowrap mt-40">
 
  <div className="relative mb-4">
  <input
    type="text"
    value={description}
    // onChange={(e) => setDescription(e.target.value)}
    onClick={showDescriptionBox}
    className="font-normal leading-relaxed text-center text-4xl border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 pr-12" // Add padding to the right
    placeholder="Description"
    readOnly
  />
  
  {/* First Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="48"
    height="48"
    className="text-blue-500 absolute right-3 top-1/2 transform -translate-y-1/2" // Position the icon
  >
    <path
      d="M14.06 2.93a1.5 1.5 0 00-2.12 0l-9.17 9.17a1.5 1.5 0 00-.36.53L1 21.5a1.5 1.5 0 001.5 1.5h.01l9.87-3.47a1.5 1.5 0 00.53-.36l9.17-9.17a1.5 1.5 0 000-2.12l-2.12-2.12a1.5 1.5 0 00-2.12 0L14.06 2.93zm2.12 2.12l1.06 1.06-8.24 8.24-1.06-1.06 8.24-8.24zM4.24 12.03l1.06 1.06-2.24 2.24-1.06-1.06 2.24-2.24zm3.16 3.16l1.06 1.06-5.24 1.76 1.76-5.24 1.06 1.06z"
      fill="currentColor"
    />
  </svg>
</div>






  </div>


  {showDiscription && (
  <div className="flex justify-center">
    <div className="p-4 md:p-5 w-96 h-96">
     
      <div className="mt-4 p-2  border-gray-300 rounded">
        {/* <h2 className="text-lg font-semibold">Description:</h2> */}
        <p className="text-base leading-relaxed text-gray-700">
          {fullDescription}
        </p>
      </div>
    </div>
  </div>
)}



  <div>
     
      {isOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow ">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  Descrption
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center "
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4">
  <textarea
    value={fullDescription}
    onChange={(e) => setFullDescription(e.target.value)}
    className="text-base leading-relaxed text-gray-500 w-full"
    placeholder=".."
    rows={8}
    wrap="soft"
  />
</div>

              {/* Modal footer */}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
                <button
                  onClick={onSaveDiscription}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Save
                </button>
                <button
                  onClick={clearFullDiscription}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

<br />

<div className="flex  justify-center">
<button
    o onClick={()=>onSubmitBlog(false)}

    className="m-4 bg-red-500 text-white  w-32 h-10 rounded-lg shadow-md"
  >
    Draft
  </button>

  {isLoading?   <div className="m-4" role="status">
      <svg
        aria-hidden="true"
        className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>:<button
    onClick={()=>onSubmitBlog(true)}

    className="m-4 bg-blue-500 text-white  w-32 h-10 rounded-lg shadow-md"
  >
    Publish
  </button>}
</div>
<br />
        
</div>


        
    )
}

export default CreateBlog