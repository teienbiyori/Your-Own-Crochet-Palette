import { StyledMenuToggle, MainHeader, StyledMainContainer, StyledWrapper } from "./myPalette"
import { SignupFooter } from "./loginPage"

export default function GalleryPage(){
  return(
    <>
    <StyledMenuToggle>
      <MainHeader/>
    </StyledMenuToggle>
     <StyledMainContainer>
      <StyledWrapper></StyledWrapper>
      <StyledWrapper></StyledWrapper>
     </StyledMainContainer>
    <SignupFooter bg="main-footer-bg" font="main-footer"/>
    </>
  )
}