import { Menu } from "./userPage"
import { SignupFooter } from "./loginPage"
import { GetBrandPaletteData } from "../api/paletteLibrary"
import { RenderColors } from "../pages/myCraftHub"
import styled from "styled-components"
import "../styles/craftPalette.scss"
import { useState } from "react"
import { ChromePicker } from "react-color"


const baseURL = "http://34.125.232.84:8080";

const StyledMenuToggle = styled.div`
header {
  z-index: 999;
  background-color: #24201e;
  height: 3rem;
  width: 100%;
  position: fixed;
  display: flex;
  padding: 0 1rem;
  .header-img-container {
    position: absolute;
    top: 3rem;
    transform: translateY(-65%);
    width: 3rem;
  }
  .header-img {
    border-radius: 50%;
  }
  h3 {
    color: #ece7e0;
    font-size: calc(0.4rem + 1vw);
    position: absolute;
    top: 3rem;
    left: 4.2rem;
    transform: translateY(-100%);
  }
  .menu-toggle-icon {
    align-self: center;
    position: absolute;
    right: 1rem;
    padding: 0 1rem;
    color: #ece7e0;
    cursor: pointer;
  }
  .menu-toggle {
    display: none; // flex
    position: absolute;
    top: 3rem;
    right: 0;
    padding-left: 0.5rem;
    background-color: #24201e;
    flex-direction: column;
    align-items: end;
    a {
        border-radius: 1rem 0 0 1rem;
        color: #ece7e0;
        padding: 0.5rem 1rem 0.5rem 1.5rem;
        margin: 0 0 0.3rem;
        font-size: 0.8rem;
        &:hover {
          background-color: #9f9089;
          color: #ece7e0;
        }
        &:active {
          background-color: rgba(159, 144, 137, 0.5);
        }
      }
  }
}
`
const StyledMainContainer  = styled.div`
  padding: 5rem 1rem 1rem;
  height: 100%;
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: minmax(300px, 400px) minmax(300px, 1fr);
  grid-auto-rows: auto;
  gap: 1rem;
  @media (max-width: 500px) {
    grid-template-columns: minmax(300px, 400px);
}
`
const StyledWrapper = styled.div`
  border: 2px solid #cac8c6;
  padding: 1rem;
  h3 {
    color: #24201e;
  }
`
const StyledMainPalette = styled.div`
  position: relative;
  margin: 0.5rem 0 1.5rem;
  background-color: rgba(202, 200, 198, 0.3);
  .name-container {
    background-color: #cac8c6;
    padding: 0.5rem 1rem;
    border-radius: 0 1rem 1rem 0;
    width: fit-content; 
    transform: translateY(0.2rem) translateX(-0.5rem);
    .palette-name {
      font-size: 0.8rem;
      color: white;
    }
  }
  .btn-container {
    position: absolute;
    top: -5px;
    right: 10px;
    button {
      width: 1.5rem;
      height: 1.5rem;
      background-color: #9f9089;
      border-radius: 0 0 0.5rem 0.5rem;
      padding: 0.2rem;
      margin: 0 0.3rem;
      color: #ece7e0;
      &:hover {
        background-color: rgba(159, 144, 137, 0.7);
      }
      &:active {
        transform: translateY(0.2rem);
      }
    }
  }
`
const StyledColorSquare =styled.div`
  margin: 0.3rem;
  height: 1rem;
  width: 1rem;
  outline: 0.1rem solid rgba(202, 200, 198, 0.3);
  background-color:${props => props?.hexCode};
  .craft-page {
    cursor: pointer;
    &:hover {
    outline: 0.1rem solid #cac8c6;
    }
    &:active {
    transform: translateY(-0.2rem);
    }
  }
`

export {
  StyledMenuToggle as StyledMenuToggle,
  StyledMainContainer as StyledMainContainer,
  StyledWrapper as StyledWrapper,
  StyledColorSquare as StyledColorSquare,
}

export function MainHeader(){
  return(<>
    <header>
     <div className="header-img-container">
      <img className="header-img" src="https://cdn01.pinkoi.com/store/teienbiyori/logo/1/300x300.jpg" alt=""/>
     </div>
     <h3>Craft Your Own Crochet Palette</h3>
     <a className="menu-toggle-icon"><i className="fa-solid fa-ellipsis-vertical"></i></a>
     <span className="menu-toggle">
      < Menu/>
     </span>
</header>
  </>)
}

function PaletteBtn({ btnId, btnClass, onClick}){
  return(<>
    <button onClick={onClick}><i id={btnId} className={btnClass}></i></button>
  </>)
}

//lots of bug
function ColorPicker({handleAddHex}){
const [pickedColor, setPickedColor] = useState("ffffff")
// const [myPalette, setMyPalette] = useState([])
const handleGetHex = (e) =>{
  setPickedColor(e.hex);
  console.log("im color:",e.hex)
  // console.log("im the one been setted:",pickedColor);
}
// const handleAddHex = ()=>{
//   if(pickedColor===""){
//     return;
//   }
//   setMyPalette( prevP => [...prevP, pickedColor]);
//   console.log(myPalette)
// }

  return(<>
  <div className="picker-container">
    <ChromePicker color={pickedColor} onChangeComplete={handleGetHex} disableAlpha={true}/>
    <div className="btn-wrapper">
    <button className="add-color" onClick={handleAddHex}><i className="fa-solid fa-plus"></i></button>
    <button className="delete-color"><i className="fa-regular fa-trash-can"></i></button>
     </div>
    </div>
  </>)
}

export function PaletteContainer({ picker, children, paletteName, colors}){
  return(
  <>
    <StyledMainPalette>
      <div className="btn-container">
        {children}
      </div>
      <div className="name-container">
        <h3 className="palette-name">{paletteName}</h3>
      </div>
        {picker}
      <div className="color-container d-flex">
        {colors}
      </div>
    </StyledMainPalette>
  </>
  ) 
}


export default function PalettePage(){
  const { data } = GetBrandPaletteData(`${baseURL}/palettes`);
  const firstBrand = data?.slice(0,30);
  const secondBrand = data?.slice(29,95);
  const thirdBrand = data?.slice(33,66);
  const brands = [{"brandName":"MITCotton", "brand":firstBrand}, {"brandName":"SUHE", "brand":secondBrand},{"brandName":"test", "brand":thirdBrand}]

  const [pickedPalettes, setpickedPalettes] = useState([]);
  const handleAddPalette = (e)=>{
    for(const eachBrand of brands){
      if(eachBrand.brandName === e.target.id){
      setpickedPalettes(prev=>[...prev, eachBrand])
      }
    }
  } 
  const handleRemovePalette = (e)=>{
    const updatedPalettes = pickedPalettes.filter((eachBrand) =>{ return eachBrand.brandName !== e.target.id})
    setpickedPalettes(updatedPalettes)
  }

  const [myPalette, setMyPalette] = useState([]);
  const handleAddHex = ()=>{
  if(pickedColor===""){
    return;
  }
  setMyPalette( prevP => [...prevP, pickedColor]);
  console.log(myPalette)
  }

  return(
    <>
    <StyledMenuToggle>
      <MainHeader/>
    </StyledMenuToggle> 
    <StyledMainContainer>
      <StyledWrapper>
        <h3># My Palette</h3>
    <PaletteContainer picker={<ColorPicker handleAddHex={handleAddHex}/>} colors={<RenderColors/>} paletteName="Create your Own">
      <PaletteBtn btnId="mode-change" btnClass="fa-solid fa-list" />
      <PaletteBtn btnId="edit-palette" btnClass="fa-solid fa-pen" />
    </PaletteContainer>
    {/* pickedPalettes add from here */}
    {pickedPalettes?.map((brand)=>(<PaletteContainer key={brand.brandName} paletteName={brand.brandName} colors={<RenderColors brand={brand.brand}/>}>
      <PaletteBtn btnId={brand.brandName} btnClass="fa-solid fa-xmark" onClick={handleRemovePalette}/>
    </PaletteContainer>))}
      </StyledWrapper>
      <StyledWrapper>
    <h3># Brand Palette</h3>
    {brands.map((brand)=>(<PaletteContainer key={brand.brandName} paletteName={brand.brandName} colors={<RenderColors brand={brand.brand}/>}>
      <PaletteBtn btnId={brand.brandName} btnClass="fa-solid fa-heart" onClick={handleAddPalette}/>
    </PaletteContainer>))}
</StyledWrapper>
</StyledMainContainer>
<SignupFooter bg="main-footer-bg" font="main-footer"/>
    </>
  )
}