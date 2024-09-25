import CssBaseline from "@mui/material/CssBaseline";
import {
  Avatar,
  Button,
  Container,
  Box,
  Grid,
  Select,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
// import api from "../../route/interceptors";

// import "../Home/home.css";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserCredential, removeUserCredential } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../interceptor";



const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showToastMessage = () => {
    toast.error("Otp Not correct!", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const errorToastMessage = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const [name, setName] = useState("");
  const [nameBox, setNameBox] = useState(false);
  const [nameError, setNameError] = useState("");

  const [gender, setGender] = useState("gender");
  const [genderBox, setGenderBox] = useState(false);

  const [email, setEmail] = useState("");
  const [emailBox, setEmailBox] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordBox, setPasswordBox] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [cPassword, setCPassword] = useState("");
  const [cPBox, setCPBox] = useState(false);
  const [cPError, setCPError] = useState("");


  const [job,setJob]=useState('')
  const [jobBox,setJobBox]=useState(false)
  const [jobError,setJobError]=useState('')

  const [selectedDate, setSelectedDate] = useState();
  const [dateBox, setDateBox] = useState(false);

  const [otp, setOtp] = useState(false);

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDateBox(false);
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


  const validatePassword = (e) => {
    const password = e.target.value;
    setPassword(password);

    const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!password) {
      setPasswordError("feild is required");
      setPasswordBox(true);
      return false;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError("contain uppercase,lowercase ,numbers");
      setPasswordBox(true);
      return false;
    }
    setPasswordError("");
    setPasswordBox(false);

    return true;
  };

  const ValidateConformPassword = (e) => {
    console.log(e.target.value);
    // console.log(password)
    // console.log(cPassword)
    const conformPassword = e.target.value;
    setCPassword(conformPassword);

    const conformPasswordRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!conformPassword) {
      setCPError("feild is required");
      setCPBox(true);
      return false;
    }
    if (!conformPasswordRegex.test(conformPassword)) {
      setCPError("feils is required");
      setCPBox(true);
      return false;
    }

    if (password !== conformPassword) {
      setCPError("passwords not matching");
      setCPBox(true);

      return false;
    }
    setCPError("");
    setCPBox(false);

    return true;
  };

  

  

 


  const handleSubmit = (e) => {
    e.preventDefault();

    const nameCheck = nameValidation({ target: { value: name } });
    const jobCheck=jobValidation({target:{value:job}})
    const emailCheck = emailValidation({ target: { value: email } });
    const passwordCheck = validatePassword({ target: { value: password } });
    const cPasswordCheck = ValidateConformPassword({
      target: { value: cPassword },
    });
    

    if (
      nameCheck &&
      emailCheck &&
      passwordCheck &&
      cPasswordCheck &&     
      jobCheck
    ) {
 

        api.post('/register',{name,email,job,password})
        .then((res)=>{
          alert("sfhu")
          console.log(res.data)
          alert(res.data.status)
           if(res.data.status){


            dispatch(
              setUserCredential({
                
                accestoken: res.data.token,
              })
            );
           
            
            navigate('/')
           }
        })
    }
  };

  

  return (
    <>
      <ToastContainer />

      
        <div>
          <form>
            <Container maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                  {/* <LockOutlined /> */}
                </Avatar>
                <Typography variant="h5">Register</Typography>

                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} style={{ position: "relative" }}>
                      <TextField
                        name="userName"
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        value={name}
                        //  helperText={nameBox ? nameError: ""}
                        //  onChange={(e)=>setName(e.target.value)}
                        onChange={nameValidation}
                        error={nameBox}
                      />
                      {nameError && (
                        <span
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "25px",
                            color: "red",
                            fontSize: "13px",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          {nameError}
                        </span>
                      )}
                    </Grid>


<Grid item xs={12} style={{ position: "relative" }}>
                      <TextField
                        fullWidth
                        id="name"
                        label="job"
                        name="email"
                        value={job}
                        onChange={jobValidation}
                        error={jobError}
                      />
                      {jobBox && (
                        <span
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "25px",
                            color: "red",
                            fontSize: "13px",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          {jobError}
                        </span>
                      )}
                    </Grid>

                    <Grid item xs={12} style={{ position: "relative" }}>
                      <TextField
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={emailValidation}
                        error={emailBox}
                      />
                      {emailBox && (
                        <span
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "25px",
                            color: "red",
                            fontSize: "13px",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          {emailError}
                        </span>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sx={{ mt: 1 }}
                      style={{ position: "relative" }}
                    >
                      <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={validatePassword}
                        error={passwordBox}
                      />

                      {passwordBox && (
                        <span
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "25px",
                            color: "red",
                            fontSize: "13px",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          {passwordError}
                        </span>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sx={{ mt: 1 }}
                      style={{ position: "relative" }}
                    >
                      <TextField
                        fullWidth
                        name="conformPassword"
                        label="conformPassword"
                        type="password"
                        id="conformpassword"
                        value={cPassword}
                        onChange={ValidateConformPassword}
                        error={cPBox}
                      />
                      {cPBox && (
                        <span
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "25px",
                            color: "red",
                            fontSize: "13px",
                            fontFamily: "Times New Roman",
                          }}
                        >
                          {cPError}
                        </span>
                      )}
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </Box>

                {/* <GoogleLogin
                  onSuccess={responseMessage}
                  onError={errorMessage}
                /> */}
              </Box>
            </Container>
          </form>

          <div className="mt-6 text-center">
            <p>
              have any account?{" "}
              <Link to="/login" style={{ color: "blue" }}>
                LOGIN
              </Link>{" "}
            </p>
          </div>
        </div>
    

    </>
  );
};

export default Register;
