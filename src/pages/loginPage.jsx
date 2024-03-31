import PrimaryColors from "../components/primaryColors";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../styles/loginPage.scss"

const StyledSignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const LoginInput = styled.input`
    background-color: #cac8c6;
    font-family: "Josefin Sans";
    font-size: 1rem;
    color: white;
    padding: 0.8rem 0.8rem 0.5rem;
    margin: 0 auto 1rem;
    border-radius: 0.5rem;
    border: none;
    width: 80%;
    max-width: 200px;
    &::placeholder {
      font-family: "Josefin Sans";
    }
    &:hover,
    &:focus {
      box-shadow: inset 0 0 0 0.1rem #ece7e0;
    }
`

const LoginButton = styled.button`
    background-color: #9f9089;
    color: white;
    font-family: "Josefin Sans";
    width: 80%;
    max-width: 200px;
    margin: 1rem auto 0;
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

export function LoginInputItem(){
  return(
    <>
     <div className="login-items">
     <div className="img-container">
            <img src="https://cdn01.pinkoi.com/store/teienbiyori/logo/1/300x300.jpg" alt=""/>
          </div>
          <div className="login-input">
            <LoginInput type="text" placeholder="User Id"/>
            <LoginInput type="password" placeholder="Password"/>
            <ForgotButton >forgot password?</ForgotButton>
            <LoginButton login>Login</LoginButton>
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

export function SignupFooter(){
  return(<>
    <footer className="d-flex align-items-end justify-content-center">
       <p className="rights">© 2024 TEIENBIYORI - All Rights Reserved Worldwide.</p>
    </footer>
  </>)
}



export default function LoginPage(){
  return(
    <>
    <StyledSignupContainer>
      <SignupMainContainer route="/register" icon="fa-solid fa-user-plus">
        <LoginInputItem/>
      </SignupMainContainer>
      <SignupFooter />
    </StyledSignupContainer>
    </>
  )
}