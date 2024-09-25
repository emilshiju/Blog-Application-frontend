import axios from "axios";

import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

const api=axios.create({
    baseURL:'http://localhost:3000/'
    
})





api.interceptors.request.use((config)=>{

  try{

   

 
    
        if (config.data instanceof FormData) {
       
          config.headers['Content-Type'] = 'multipart/form-data';
          
        } else {
      
          config.headers['Content-Type'] = 'application/json';
        }
       
             
        const token = JSON.parse(localStorage.getItem('accestoken')); // Assuming you store the token in localStorage
        if (token) {
          
          config.headers.Authorization = `Bearer ${token}`;
        }
      
        
       
        config.withCredentials = true;
       
        
     

  

        console.log(config)
        
       
        return config
      
      }catch(error){
       

      }
    },
    (error)=>{
      
        return Promise.reject(error);
    }


)

api.interceptors.response.use(function (response) {



  
    return response;
  }, async function (error) {


  });



  
  


export default api