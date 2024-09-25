
import React,{useEffect, useState,useRef} from "react";


import api from "./interceptor";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "./firebase";

import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';



const PersonalDetails=()=>{

    const [name, setName] = useState();
  const [lastName, setLastName] = useState("Ferguson");
  const [job,setJob]=useState()
  const [email, setEmail] = useState("your.email@mail.com");
  const [profession, setProfession] = useState("");
  const [bio, setBio] = useState("");
  const [path,setPath]=useState(null)
  const [image,setImage]=useState(null)
  const [prevImage,setPrevImage]=useState(null)
  const [prevPath,setPrevPath]=useState(null)
  const [makeChange,setMakeChange]=useState(false)

  const handleSubmit = () => {
    e.preventDefault();
    console.log({ firstName, lastName, email, profession, bio });
  };

  const fileInputRef = useRef(null);

  const handleChange = () => {
    fileInputRef.current.click();
  };


 const  fetchUserDetails=()=>{

    api.get('/personalDetails')
    .then((res)=>{

      if(res.data.personalDetails){
        setName(res.data.personalDetails.userName)
        setJob(res.data.personalDetails.job)
        setEmail(res.data.personalDetails.email)
        setImage(res.data.personalDetails.imageUrl)
      }

    })

  }

  useEffect(()=>{

   fetchUserDetails()

    
  },[])

  const handleFileChange=(e)=>{

    
    setPrevImage(image)

    const file = e.target.files[0];
    setPath(file)
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl)
    setMakeChange(true)


  }

  const deleteImage=()=>{
  setImage(null)
  setPrevImage(null)
  setPath(null)
  setPrevPath(null)

  }

  const changeUrl=()=>{
    setPrevImage(null)
    setMakeChange(false)
  }

  const changePrevUrl=()=>{
    setImage(prevImage)
    
    setMakeChange(false)

  }


  const [nameBox, setNameBox] = useState(false);
  const [nameError, setNameError] = useState("");


  const [emailBox, setEmailBox] = useState(false);
  const [emailError, setEmailError] = useState("");



  const [jobBox,setJobBox]=useState(false)
  const [jobError,setJobError]=useState('')


  
  const nameValidation = (e) => {
    const value = e.target.value;
    setName(value);
    const nameRegex = /^[a-zA-Zà-ÿÀ-ÿ]+([ '-][a-zA-Zà-ÿÀ-ÿ]+)*$/;
    if (!value) {
      setNameError("feild is requied");
      setNameBox(true);
      return false;
    }
    if (!nameRegex.test(value)) {
      setNameError("name format is not correct");
      setNameBox(true);
      return false;
    }
    setNameError("");
    setNameBox(false);
    return true;
  };

  

  const emailValidation = (e) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const email = e.target.value;
    setEmail(email);
    if (!email) {
      setEmailError("feild is required");
      setEmailBox(true);
      return false;
    }
    if (!regex.test(email)) {
      setEmailError("check the feild");
      setEmailBox(true);
      return false;
    }
    setEmailError("");
    setEmailBox(false);
    return true;
  };


  const jobValidation=(e)=>{

    const jobRegex = /^[a-zA-Zà-ÿÀ-ÿ]+([ '-][a-zA-Zà-ÿÀ-ÿ]+)*$/;

    const job=e.target.value
    setJob(job)

    if(!job){
        setJobError("feild is Required")
        setJobBox(true)
        return false
    }

    if(!jobRegex.test(job)){
        setJobError("proper job description")
        setJobBox(true)
        return false
    }

    setJobError('')
    setJobBox(false)
    return true

  }


  const submitForm=(e)=>{

    e.preventDefault();
   

    const nameCheck = nameValidation({ target: { value: name } });
    const jobCheck=jobValidation({target:{value:job}})
    const emailCheck = emailValidation({ target: { value: email } });
    
    if(path){
      alert("keri")
    


      const onChangeUploadImageToFirebase = () => {
        
  
        const storageRef = ref(storage, path.name);
    
        uploadBytes(storageRef, path).then((snapshot) => {
          console.log("Uploaded a blob or file!");
  
    
          getDownloadURL(snapshot.ref).then((downloadURL) => {
           
            console.log("downloded")
            console.log(downloadURL)
           
           
      api.post('/updateUserDetails',{name,job,email,image:downloadURL})
            .then((res)=>{

              fetchUserDetails()
            
                
                 toast.success('succesfuly updated')




            })
        });
      
      })
    }

onChangeUploadImageToFirebase()  


    }
    


    const imageStatus=image

    if ( nameCheck &&emailCheck &&jobCheck&&!path){
      alert("kerilaaa")


      api.post('/updateUserDetails',{name,job,email,image})
      .then ((res)=>{

        if(res.data.status){
          fetchUserDetails()
          toast.success('succesfuly updated')
        }
      })

    } 




  }


    return (
        <div>
<Toaster />
{makeChange && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative max-w-sm p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
            <span className="font-medium">Alert!</span> Are you sure to Change.
            <button className="text-lg font-bold ml-2" onClick={changeUrl}>
              Yes
            </button>
            <button className="text-lg font-bold ml-4" onClick={changePrevUrl}>
              No
            </button>
          </div>
        </div>
      )}


<main className="w-full min-h-screen flex justify-center items-center bg-gray-50 py-12">
      <div className="w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-800">Profile</h2>

          <div className="flex flex-col items-center space-y-6">
            {console.log("all imageeeeeeeeeeeeeeeeeeeeeeeeeee")}
            {console.log(image)}
            <img
              className="w-32 h-32 object-cover rounded-full ring-4 ring-[#002D74] "
              src={image}
              alt="Profile"
            />
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleChange}
                className="py-2 px-5 bg-[#002D74] hover:bg-[#206ab1]  text-white rounded-lg transition focus:ring-4 focus:ring-indigo-300"
              >
                Change Picture
              </button>
              <input
            type="file"
            id="fileInput"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            name="image"
          />
              <button
                type="button"
                onClick={deleteImage}
                className="py-2 px-5 bg-white border border-[#002D74] text-[#002D74] rounded-lg hover:bg-gray-100 transition focus:ring-4 focus:ring-indigo-300"
              >
                Delete Picture
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                   Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your first name"
                  value={name}
                  onChange={nameValidation}
                 
                />
              
                 {nameBox && (
                        <span
                          style={{
                            
                            color: "red",
                            fontSize: "13px",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          {nameError}
                        </span>
                      )}
              </div>

              
            </div>
            <div className="w-full">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                Job
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your first name"
                  value={job}
                  onChange={jobValidation}
                  required
                />
                 {jobBox && (
                        <span
                          style={{
                           
                            color: "red",
                            fontSize: "13px",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          {jobError}
                        </span>
                      )}
              </div>

            <div className="w-full">
              <label
                htmlFor="email"
                
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                readOnly
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your.email@mail.com"
                value={email}
                onChange={emailValidation}
                required
              />
               {emailBox && (
                        <span
                          style={{
                            
                            color: "red",
                            fontSize: "13px",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          {emailError}
                        </span>
                      )}
            </div>

          

            <div className="flex justify-end">
              <button
                onClick={submitForm}
                className="py-2.5 px-6 bg-[#002D74] hover:bg-[#206ab1]   text-white rounded-lg  transition focus:ring-4 focus:ring-indigo-300"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>

        </div>
    )
}
export default PersonalDetails

