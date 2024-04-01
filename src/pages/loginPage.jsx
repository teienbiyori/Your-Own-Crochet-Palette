import PrimaryColors from "../components/primaryColors";
import { login } from "../api/authToken";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import "../styles/loginPage.scss"

const StyledSignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const StyledLoginInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 200px;
  margin-bottom: 0.5rem;
  input {
    background-color: #cac8c6;
    font-family: "Josefin Sans";
    font-size: 1rem;
    color: white;
    padding: 0.8rem 0.8rem 0.5rem;
    // margin: 0 auto 1rem;
    border-radius: 0.5rem;
    border: none;
    &::placeholder {
      font-family: "Josefin Sans";
    }
    &:hover,
    &:focus {
      box-shadow: inset 0 0 0 0.1rem #ece7e0;
    }
    &:invalid ~ span {
    display: block;
    } 
  }
  span {
    text-align: center;
    display: none;
    font-size: 0.5rem;
    margin-top: 0.2rem;
  } 
`

const LoginButton = styled.button`
    background-color: #9f9089;
    color: white;
    font-family: "Josefin Sans";
    width: 80%;
    max-width: 200px;
    margin-top: 1rem;
    padding: 0.8rem 0.8rem 0.5rem;
    font-size:  1rem;
    border-radius: 0.5rem;
    &:active {
      background-color: #ece7e0;
      color: #9f9089;
    }
`

const ForgotButton = styled(LoginButton)`
   background-color: transparent;
   color: #ece7e0;
   margin: 0 auto;
   padding: 0;
   font-size: 0.7rem;
   &:active {
    background-color: transparent;
    color: #9f9089;
    transform: translateY(30%);
   }
`

export {
  StyledSignupContainer as StyledSignupContainer,
  LoginInput as RegisterInput,
  LoginButton as RegisterButton
}

export function SignupMainContainer({children, route, icon}){
  return(<>
    <main className="signup-container">
        <div className="container-up">
          <div className="login-wrapper">
            <h2>Craft Your Own</h2>
            <h1>Crochet Palette</h1>
            <div className="login-container">
            <div className="login-content">
              <PrimaryColors />
              {children}
              <Link to={route}>
              <TagBtn purpose="create-account" icon={icon}/>
              </Link>
            </div>
          </div>
          </div>    
        </div>
        <div className="container-down"></div>
    </main>
  </>)
}

export function LoginInput(props){
  const {onChange, errorMessage, ...inputProps } = props;
  return(<>
  <StyledLoginInput>
    <input {...inputProps} onChange={onChange}/>
    <span>{errorMessage}</span>
  </StyledLoginInput>
  </>)
}

export function LoginInputItem({onChange, handleClick}){
   const LoginInputs = [
    {
      id:1,
      name:"email",
      type:"text",
      placeholder:"Email"
    },
    {
      id:2,
      name:"password",
      type:"password",
      placeholder:"Password"
    }
  ]
  return(
    <>
     <div className="login-items">
     <div className="img-container">
            <img src="https://cdn01.pinkoi.com/store/teienbiyori/logo/1/300x300.jpg" alt=""/>
          </div>
          <div className="login-input">
            {LoginInputs.map((input)=>(
              <LoginInput key={input.id} {...input} required onChange={onChange}/>
            ))}
            <ForgotButton >forgot password?</ForgotButton>
            <LoginButton login onClick={handleClick}>Login</LoginButton>
          </div>
        </div>
    </>
  )
}

function TagBtn({ purpose, icon }){
  return(
    <>
    <button className={purpose}>
          <i className={icon}></i>
        </button>
    </>
  )
}

export function SignupFooter({bg, font}){
  return(<>
    <footer className={`d-flex align-items-end justify-content-center ${bg}`}>
       <p className={`rights ${font}`}>© 2024 TEIENBIYORI - All Rights Reserved Worldwide.</p>
    </footer>
  </>)
}



export default function LoginPage(){
   const navigate =useNavigate();
  const [userData, setUserData] = useState({
    email:"",
    password:"",
  });
  const onChange = (e) =>{
    setUserData({...userData, [e.target.name]: e.target.value});
    }
  
  const handleClick = async() =>{
    if( userData.email.length===0 || userData.password.length <6){
      alert('missing');
      return;
    }
    console.log(userData);
    const { success, token } = await login({...userData});
    if(success){
      localStorage.setItem("token:",token);
      Swal.fire({
        icon: "success",
        title: "Let's get started!",
        color: "#24201e",
        background: "#ece7e0",
        timer:1000,
        showConfirmButton:false
      });
      setTimeout(()=>navigate("/user"),1000)
      return;
    }
    Swal.fire({
        icon: "error",
        title: "Login Failed...",
        color: "#24201e",
        background: "#ece7e0",
        timer:1000,
        showConfirmButton:false
    });
  }
  return(
    <>
    <StyledSignupContainer>
      <SignupMainContainer route="/register" icon="fa-solid fa-user-plus">
        <LoginInputItem onChange={onChange} handleClick={handleClick}/>
      </SignupMainContainer>
      <SignupFooter bg= "signup-footer-bg" font="signup-footer"/>
    </StyledSignupContainer>
    </>
  )
}