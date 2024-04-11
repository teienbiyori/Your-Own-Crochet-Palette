import { StyledMenuToggle, MainHeader, StyledMainContainer, StyledWrapper, PaletteContainer, PaletteBtn, StyledColorSquare} from "./myPalette"
import { SignupFooter } from "./loginPage"
import { Snowfall } from "../assets/snowfall"
import { Honey } from "../assets/honey"
import autumn from "../assets/autumn.svg"
import styled from "styled-components"


const StyledPaletteSquare =styled.div`
  height: 1rem;
  width: 1rem;
  outline: 0.1rem solid rgba(36, 32, 30, 0.3);
  background-color:${props => props?.hexCode};
`


export function RenderColors({brand}){
    return(<>
      {brand?.map((color)=>(<StyledColorSquare key={color?._id} hexCode={color?.hexCode} />))}
    </>)
}

export function RenderChosenColors({array}){
  const handleGetHex = (e) =>{
    console.log(e.target.id)
  }
    return(<>
      {array?.map((color)=>(<StyledColorSquare id={color} key={color} hexCode={color} onClick={handleGetHex}/>))}
    </>)
}

export function RenderChosenPalette({array}){
    return(<>
      {array?.map((color)=>(<StyledPaletteSquare id={color} key={color} hexCode={color}/>))}
    </>)
}

function CraftHubContainer(){
  return(<>
  <div className="crafthub-container">
     <div className="path-slide-area">
    <button>
      <i className="fa-solid fa-hand-point-left"></i>
    </button>
    <div className="path-area"><Snowfall path="path" first="#9f9089" second="#614d3b" third="#cac8c6" fourth="#000000"/></div>
    <div className="path-area"><Honey path="path" first="#9f9089" second="#614d3b" third="#cac8c6"/></div>
    <div className="path-area"><img src={autumn} alt="" className="path" /></div>
    <button>
      <i className="fa-solid fa-hand-point-right"></i>
    </button>
  </div>
  <div className="path-area">
    <Honey path="path-lg" first="#9f9089" second="#614d3b" third="#cac8c6"/>
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
  return(<>
  <div className="selector-area">
    <div className="selected">
      <div className="selected-color color1"></div>
      <div className="selected-color color2"></div>
      <div className="selected-color color3"></div>
      <div className="selected-color color4"></div>
    </div>
    <div className="edit-icon">
      <button><i className="fa-solid fa-shuffle"></i></button>
      <button><i className="fa-solid fa-download"></i></button>
      <button><i className="fa-regular fa-trash-can"></i></button>
    </div>
  </div>
  </>)
}


export default function CraftHubPage(){
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
      </StyledWrapper>
    </StyledMainContainer>
    <SignupFooter bg="main-footer-bg" font="main-footer"/>
    </>
  )
}