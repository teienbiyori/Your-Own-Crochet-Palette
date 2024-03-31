import PrimaryColors from "../components/primaryColors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../styles/userPage.scss"

const StyledMenuContainer = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 500px;
  display: flex;
`
const StyledLeftContainer = styled.div`
  position: relative;
  background-color: #614d3b;
  flex: 1;
  &.active {
    animation: fadeOut 1s ease-out;
  }
`
const StyledRightContainer = styled.div`
  position: relative;
  width: ${({width})=> width};
  max-width: ${({maxW})=> maxW};
  padding: 1rem;
  display: flex;
  justify-content: center;
`
const StyledBrandContainer = styled.div`
  position: absolute;
  right: 4rem;
  bottom: 2.5rem;
  color: #ece7e0;
  h1 {
    font-size: calc(1.5rem + 1vw);
  }
  h2 {
    font-size: calc(1rem + 1vw);
  }
  p {
    font-size: calc(0.5rem + 1vw);
  }
`
export {
  StyledMenuContainer as StyledMenuContainer,
  StyledLeftContainer as StyledLeftContainer,
  StyledRightContainer as StyledRightContainer,
  StyledBrandContainer as StyledBrandContainer
}

export function BrandName(){
  return(
    <>
        <h2>Craft Your Own</h2>
        <h1>Crochet Palette</h1>
        <p className="rights">© 2024 TEIENBIYORI - All Rights Reserved Worldwide.</p>
    </>
  )
}


export default function DemoPage(){
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const handleClick = () =>{
    setAnimate(!animate);
    setTimeout(()=>{navigate("/login")},800);
  };
  return(
    <>
      <StyledMenuContainer>
         <StyledLeftContainer className={animate? "active": ""} onClick={handleClick}>
          <PrimaryColors first="#614d3b" second="#24201e" third="#9f9089" fourth="#cac8c6" fifth="#ece7e0" anime="pageChange userPageVersion"/>
          <StyledBrandContainer>
             <BrandName/>
          </StyledBrandContainer>
         </StyledLeftContainer>
         <StyledRightContainer width="3rem"/>
      </StyledMenuContainer>
    </>
  )
}