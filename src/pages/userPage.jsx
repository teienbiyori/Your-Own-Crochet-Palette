import { StyledMenuContainer, StyledLeftContainer, StyledRightContainer, BrandName, StyledBrandContainer } from "./demoPage";
import PrimaryColors from "../components/primaryColors";

import styled from "styled-components";
import "../styles/craftPalette.scss";

const StyledMenuBrandContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 80%;
  color: #614d3b;
  h1 {
    font-size: calc(0.8rem + 1vw);
  }
  h2 {
    font-size: calc(0.5rem + 1vw);
  }
  p {
    font-size: calc(0.1rem + 1vw);
  }
`

function MenuLink({route, text, icon}){
  return(<>
    <a href={route}>{text}<i className={icon}></i></a>
  </>)
}

export default function UserPage(){
  return(
    <>
    <StyledMenuContainer>
         <StyledLeftContainer>
          <PrimaryColors first="#24201e" second="#614d3b" third="#9f9089" fourth="#cac8c6" fifth="#ece7e0" anime="userPageVersion"/>
          <StyledBrandContainer>
            <BrandName/>
          </StyledBrandContainer>
         </StyledLeftContainer>
         <StyledRightContainer width="85%" maxW="400px">
         
      <div className="profile-container d-flex">
        <div className="img-container d-flex">
          <div className="img"></div>  
          <h2>-TEIENBIYORI-</h2>
        </div>
        <button className="edit"><i className="fa-regular fa-pen-to-square"></i></button>
        <div className="menu-container">
          <MenuLink route="/palette" text="My Palette " icon="fa-solid fa-swatchbook" />
          <MenuLink route="/crafthub" text="My Craft Hub " icon="fa-solid fa-brush" />
          <MenuLink route="/gallery" text="My Gallery " icon="fa-regular fa-image" />
        </div>
        <StyledMenuBrandContainer>
          <BrandName/>
        </StyledMenuBrandContainer>
      </div>
         </StyledRightContainer>
    </StyledMenuContainer>
    </>
  )
}