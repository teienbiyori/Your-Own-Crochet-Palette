import { StyledMenuToggle, MainHeader, StyledMainContainer, StyledWrapper } from "./myPalette"
import { SignupFooter } from "./loginPage"
import { Snowfall } from "../assets/snowfall"
import { Honey } from "../assets/honey"
import { Autumn } from "../assets/autumn"

export default function GalleryPage(){
  return(
    <>
    <StyledMenuToggle>
      <MainHeader/>
    </StyledMenuToggle>
     <StyledMainContainer>
      <StyledWrapper>
        <h3># Sending Emails</h3>
        hi, there! here may become a area to send hex code to our users.
      </StyledWrapper>
      <StyledWrapper>
        <h3># My Gallery</h3>
        <div className="pattern-gallery">
          <div className="each-pattern">
            <Snowfall path="pattern" first="#9f9089" second="#614d3b" third="#cac8c6"/>
            <div className="pattern-info">
              <div className="palette-info">
                <input className="palette-name" type="text" placeholder="palette-name" defaultValue="teienbiyori"/>
                <div className="fav-palette">1234</div>
              </div>
              <button><i className="fa-regular fa-paper-plane"></i></button>
            </div>
          </div>
        <div className="each-pattern">
          <Honey path="pattern" first="#9f9089" second="#614d3b" third="#cac8c6"/>
        </div>
        <div className="each-pattern">
          <Autumn path="pattern" first="#9f9089" second="#614d3b" third="#cac8c6"/>
        </div>
        </div>
      </StyledWrapper>
     </StyledMainContainer>
    <SignupFooter bg="main-footer-bg" font="main-footer"/>
    </>
  )
}