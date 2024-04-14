import { StyledMenuToggle, MainHeader, StyledMainContainer, StyledWrapper, PaletteContainer, PaletteBtn} from "./myPalette"
import { SignupFooter } from "./loginPage"
import { GetMyFavBrands } from "../api/GetBrandPaletteData"
import { Snowfall } from "../assets/snowfall"
import { Honey } from "../assets/honey"
import { Autumn } from "../assets/autumn"
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { useState } from "react"

//squares inside my collection
const StyledPaletteSquare =styled.div`
  height: 1rem;
  width: 1rem;
  outline: 0.1rem solid rgba(36, 32, 30, 0.3);
  background-color:${props => props?.hexcode};
`
//Selectable squares in the crafthub page
const StyledColorSquare =styled.div`
  height: 1.5rem;
  width: 1.1rem;
  outline: 0.1rem solid rgba(36, 32, 30, 0.3);
  background-color:${props => props?.hexcode};
  ${props => props.page &&`
    cursor: pointer;
    &:hover {
    outline: 0.1rem solid rgba(36, 32, 30, 0.6);
    }
    &:active {
    transform: translateY(-0.2rem);
    }
    `
  }
`
//squares inside selector
const SelectedColor = styled.div`
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  border-radius: 0.3rem;
  background-color: ${props => props.color || "rgba(36, 32, 30, 0.2)"};
  &:hover {
    outline: 2px solid rgba(36, 32, 30, 0.3);
  }
`

export {
  StyledColorSquare as StyledColorSquare,
}

export function RenderColors({brand}){
    const location = useLocation();
    const isCraftHub = location.pathname === "/crafthub";
    const handleGetHex = (e) =>{
    console.log(e.target.id)
  }
    const brandPalette = brand.paletteIds;
    return(<>
      {brandPalette?.map((color)=>(<StyledColorSquare id={color.hexCode} key={color.paletteId} hexcode={color.hexCode} page={isCraftHub} onClick={handleGetHex}/>))}
    </>)
}

export function RenderChosenColors({array}){
  const location = useLocation();
  const isCraftHub = location.pathname === "/crafthub";
  const handleGetHex = (e) =>{
    console.log(e.target.id)
  }
    return(<>
      {array?.map((color)=>(<StyledColorSquare id={color} key={color} hexcode={color} page={isCraftHub} onClick={handleGetHex}/>))}
    </>)
}

export function RenderChosenPalette({array}){
    return(<>
      {array?.map((color)=>(<StyledPaletteSquare id={color} key={color} hexcode={color}/>))}
    </>)
}

function CraftHubContainer(){
  return(<>
  <div className="crafthub-container">
     <div className="path-slide-area">
    <button>
      <i className="fa-solid fa-hand-point-left"></i>
    </button>
    <Snowfall path="path" first="#9f9089" second="#614d3b" third="#cac8c6" fourth="#24201e"/>
    <Honey path="path" first="#9f9089" second="#614d3b" third="#cac8c6"/>
    <Autumn path="path" first="#9f9089" second="#614d3b" third="#cac8c6" fourth="#24201e"/>
    <button>
      <i className="fa-solid fa-hand-point-right"></i>
    </button>
  </div>
  <div className="path-area">
    <Honey path="path-lg" first="#9f9089" second="#614d3b" third="#cac8c6" fourth="#24201e"/>
  </div>
  </div>
  </>)
}

function PaletteCollection({array}){
  return(<>
  <div className="path-palette">
    <RenderChosenPalette array={array}/>
  </div>
  </>)
}

function PaletteSelector(){
  const [colorSelection, setColorSelection]= useState([
  '#F0EAD6',
  '#E8E4D9',
  '#F5F5F5',
  '#E6E6DA'
]);

  const handleShuffle = ()=>{
    const shuffledSelection = [...colorSelection];
    for(let i=shuffledSelection.length-1; i>0; i--){
      const randomIndex = Math.floor(Math.random()*(i+1));
      [shuffledSelection[i], shuffledSelection[randomIndex]] = [shuffledSelection[randomIndex], shuffledSelection[i]];
    }
    setColorSelection(shuffledSelection);
  }

  const handleClear = () =>{
    setColorSelection(['','','',''])
  }
 
  return(<>
  <div className="selection-area">
    <div className="selected">
      {colorSelection.map((color, index)=>(<SelectedColor key={`${color}-${index}`} color={color}/>))}
    </div>
    <div className="edit-icon">
      <button onClick={handleShuffle}><i className="fa-solid fa-shuffle"></i></button>
      <button><i className="fa-solid fa-download"></i></button>
      <button onClick={handleClear}><i className="fa-regular fa-trash-can"></i></button>
    </div>
  </div>
  </>)
}


export default function CraftHubPage(){
  const myToken = localStorage.getItem("token")
  const { favBrands } = GetMyFavBrands(myToken);

  const arrayTesting = [
  "#FF6F61",
  "#6B5B95",
  "#88B04B",
  "#F7CAC9"
];
  const threeTimes = [1, 2, 3, 4, 5, 6, 7, 9, 8, 10];
  return(
    <>
    <StyledMenuToggle>
      <MainHeader/>
    </StyledMenuToggle>

    <StyledMainContainer>
      <StyledWrapper>
        <CraftHubContainer/>
        <PaletteContainer
        paletteName="My Collection"
        colorContainer="collection-container" colors={threeTimes.map((eachtime)=>(<PaletteCollection key={eachtime} array={arrayTesting}/>))}>
      <PaletteBtn btnId="tag-close" btnClass="fa-solid fa-minus" />
        </PaletteContainer>
      </StyledWrapper>

      <StyledWrapper>
        <PaletteSelector/>
        <PaletteContainer paletteName="My Palette">
          <PaletteBtn btnId="tag-close" btnClass="fa-solid fa-minus" />
        </PaletteContainer>
        {favBrands?.map((eachData)=>(
      <PaletteContainer key={eachData._id} paletteName={eachData.brand.name} colorContainer="color-container"
      colors={<RenderColors brand={eachData.brand}/>}>
      <PaletteBtn btnId="tag-close" btnClass="fa-solid fa-minus"/>
      </PaletteContainer>
    ))} 
      </StyledWrapper>
    </StyledMainContainer>
    <SignupFooter bg="main-footer-bg" font="main-footer"/>
    </>
  )
}