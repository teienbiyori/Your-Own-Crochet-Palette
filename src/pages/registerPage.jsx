import { Footer } from "../components/footer";
import { RegisterInput, RegisterButton, SignupMainContainer, StyledSignupContainer } from "./loginPage"
import { register } from "../api/authToken"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function RegisterInputItem({handleClick, onChange}){
   const registerInputs = [
    {
      id:1,
      name:"name",
      type:"text",
      placeholder:"Username",
      maxLength:"15",
      required:true,
      errorMessage:"Up to 15 characters is acceptable."
    },
    {
      id:2,
      name:"email",
      type:"text",
      placeholder:"Email",
      pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$",
      required:true,
      errorMessage:"Should be a valid email."
    },
    {
      id:3,
      name:"password",
      type:"password",
      placeholder:"Password",
      pattern: "^[A-Za-z0-9]+$",
      required:true,
      errorMessage:"6 characters or more, only letters and numbers acceptable."
    },
    {
      id:4,
      name:"checkpassword",
      type:"password",
      placeholder:"confirmPassword",
      required:true,
    },
  ];
  return(
    <>
     <div className="login-items">
          <div className="login-input">
            {registerInputs.map((input)=>(
              <RegisterInput key={input.id} {...input} onChange={onChange} required/>
            ))}
            <RegisterButton login onClick={handleClick}>Register</RegisterButton>
          </div>
        </div>
    </>
  )
}

export default function RegisterPage(){
  const navigate =useNavigate();
  const [userData, setUserData] = useState({
    name:"",
    email:"",
    password:"",
    checkpassword:"",
  });
  const onChange = (e) =>{
    setUserData({...userData, [e.target.name]: e.target.value});
    }
  
  const handleClick = async() =>{
    if(userData.name.length ===0 || userData.email.length===0 || userData.password.length <6){
      alert("Mind quick check on the info? Thanks:)");
      return;
    }
    if(userData.password !== userData.checkpassword){
      alert("Passwords do not match!");
      return;
    }
    console.log(userData);
    const { success } = await register({...userData});
    if(success){
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        color: "#24201e",
        background: "#ece7e0",
        timer:1000,
        showConfirmButton:false
      });
      navigate("/login");
      return;
    }else{
    Swal.fire({
        icon: "error",
        title: "Register Failed...",
        color: "#24201e",
        background: "#ece7e0",
        timer:1000,
        showConfirmButton:false
    });
    }
  }
  return(
    <>
    <StyledSignupContainer>
      <SignupMainContainer route="/login" icon="fa-solid fa-rotate-left">
        <RegisterInputItem onChange={onChange} handleClick={handleClick}/>
      </SignupMainContainer>
      <Footer bg="signup-footer-bg" font="signup-footer"/>
    </StyledSignupContainer>
    </>
  )
}