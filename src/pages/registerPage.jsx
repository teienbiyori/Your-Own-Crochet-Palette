import { SignupFooter, RegisterInput, RegisterButton, SignupMainContainer, StyledSignupContainer } from "./loginPage"

function RegisterInputItem(){
  return(
    <>
     <div className="login-items">
     <div className="img-container" style={{"maxWidth": "100px"}}>
            <img src="https://cdn01.pinkoi.com/store/teienbiyori/logo/1/300x300.jpg" alt=""/>
          </div>
          <div className="login-input">
            <RegisterInput type="text" placeholder="User Id"/>
            <RegisterInput type="email" placeholder="Email"/>
            <RegisterInput type="password" placeholder="Password"/>
            <RegisterInput type="password" placeholder="Password Again"/>
            <RegisterButton login>Register</RegisterButton>
          </div>
        </div>
    </>
  )
}

export default function RegisterPage(){
  return(
    <>
    <StyledSignupContainer>
      <SignupMainContainer route="/login" icon="fa-solid fa-rotate-left">
        <RegisterInputItem/>
      </SignupMainContainer>
      <SignupFooter />
    </StyledSignupContainer>
    </>
  )
}