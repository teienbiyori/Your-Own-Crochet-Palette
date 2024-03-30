import PrimaryColors from "../components/primaryColors";
// import { Suspense } from "react";
import styled from "styled-components";
import "../styles/userPage.scss"

const StyledMenuContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`
const StyledLeftContainer = styled.div`
  position: relative;
  background-color: #614d3b;
  flex: 1;
  .active {
    animation: fadeOut 0.8s ease-out 1.5s;
  }
`
const StyledRightContainer = styled.div`
  width: 3rem;
  padding: 1rem;
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

function BrandName(){
  return(
    <>
      <StyledBrandContainer>
        <h2>Craft Your Own</h2>
        <h1>Crochet Palette</h1>
        <p className="rights">© 2024 TEIENBIYORI - All Rights Reserved Worldwide.</p>
      </StyledBrandContainer>
    </>
  )
}


export default function DemoPage(){
  return(
    <>
    {/* <Suspense fallback={<Loading/>}> */}
      <StyledMenuContainer>
         <StyledLeftContainer>
          <PrimaryColors first="#614d3b" second="#24201e" third="#9f9089" fourth="#cac8c6" fifth="#ece7e0"/>
          <BrandName/>
         </StyledLeftContainer>
         <StyledRightContainer />
      </StyledMenuContainer>
      {/* </Suspense> */}
    </>
  )
}