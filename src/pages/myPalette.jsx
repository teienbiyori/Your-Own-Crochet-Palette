import { Menu } from "./userPage"
import { SignupFooter } from "./loginPage"
import { GetBrandPaletteData, GetMyFavBrands, AddBrandToMine, RemoveBrandFromMine, GetMyPaletteColor, useAddColorToMine, useRemoveColorFromMine } from "../api/GetBrandPaletteData"
import { StyledColorSquare } from "./myCraftHub"
import styled from "styled-components"
import { useState } from "react"
import { ChromePicker } from "react-color"
import { Link } from "react-router-dom"


const baseURL = "http://54.250.240.16:8080";

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
    height: 3rem;
    border-radius: 50%;
    background-size: 100%;
    background-position: -0.15rem;
    background-image: url("https://cdn01.pinkoi.com/store/teienbiyori/logo/1/300x300.jpg");
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
  overflow-y: scroll;
  padding: 1rem;
  h3 {
    color: #24201e;
  }
`
const StyledMainPalette = styled.div`
  position: relative;
  margin: 1rem 0 0rem;
  background-color: rgba(255, 255, 255, 0.5);

  .name-container {
    background-color: #9f9089;
    padding: 0.5rem 1rem;
    border-radius: 0 1rem 1rem 0;
    width: fit-content; 
    transform: translateY(0.2rem) translateX(-0.5rem);
    .palette-name {
      font-size: 0.8rem;
      color: #ece7e0;
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
        background-color: rgba(159, 144, 137, 0.8);
      }
      &:active {
        transform: translateY(0.2rem);
      }
    }
  }
`
export {
  StyledMenuToggle as StyledMenuToggle,
  StyledMainContainer as StyledMainContainer,
  StyledWrapper as StyledWrapper,
}

export function MainHeader(){
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () =>{
    setShowMenu(!showMenu);
  }
  return(<>
    <header>
      <Link to="/user">
        <div className="header-img-container">
     </div>
      </Link>
     <h3>Craft Your Own Crochet Palette</h3>
     <a className="menu-toggle-icon" onClick={handleShowMenu}><i className="fa-solid fa-ellipsis-vertical"></i></a>
     <span style={{display:showMenu? "flex":"none"}}className="menu-toggle">
      < Menu/>
     </span>
</header>
  </>)
}

export function PaletteBtn({ btnId, btnClass, onClick}){
  return(<>
    <button onClick={onClick}><i id={btnId} className={btnClass}></i></button>
  </>)
}

function ColorPicker(props){
const [pickedColor, setPickedColor] = useState("")
const handleGetHex = (e) =>{
  setPickedColor(e.hex);
}
const handleAddHex = ()=>{
  if(pickedColor===""){
    return;
  }
  props.onChildData(pickedColor)
}

  return(<>
  <div className="picker-container">
    <ChromePicker color={pickedColor} onChangeComplete={handleGetHex} disableAlpha={true}/>
    <div className="btn-wrapper">
    <button className="add-color" onClick={handleAddHex}><i className="fa-solid fa-plus"></i></button>
     </div>
    </div>
  </>)
}

export function PaletteContainer({ picker, children, paletteName, colorContainer,colors}){
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
      <div className={colorContainer}>
        {colors}
      </div>
    </StyledMainPalette>
  </>
  ) 
}

function ShowcaseColors({brand}){
    const handleGetHex = (e) =>{
    console.log(e.target.id)
  }
    const brandPalette = brand.paletteIds;
    return(<>
      {brandPalette?.map((color)=>(<StyledColorSquare id={color.hexCode} key={color.paletteId} hexcode={color.hexCode} onClick={handleGetHex}/>))}
    </>)
}

function ShowcaseChosenColors({array, onKidsData}){
  const [picked, setPicked] = useState("");
  const handleGetHex = (e) =>{
    console.log(e.target.id)
    setPicked(e.target.id)
  }
  const handleDelHex = ()=>{
    if(picked===""){
      return;
    }
    onKidsData(picked)
  }
    return(<>
      <button className="delete-color" onClick={handleDelHex}><i className="fa-regular fa-trash-can"></i></button>
      {array?.map((color)=>(<StyledColorSquare id={color._id} key={color._id} hexcode={color.hexCode} onClick={handleGetHex}/>))}
    </>)
}


export default function PalettePage(){
  const myToken = localStorage.getItem("token")
  const { data } = GetBrandPaletteData(`${baseURL}/brands`);
  const brands = data;
  const { favBrands } = GetMyFavBrands(myToken);
  // const [myFavBrands, setMyFavBrands] = useState([]);
  const [brandID, setBrandID] = useState("");
  const [delBrandID, setDelBrandID] = useState("");
  AddBrandToMine(myToken, brandID);
  RemoveBrandFromMine(myToken, delBrandID)
  // setMyFavBrands(favBrands);
 
  const handleAddPalette = (e)=>{
    if(e.target.id.length===0){
      return;
    }
    setBrandID(e.target.id);
  } 
  const handleRemovePalette = (e)=>{
     if(e.target.id.length===0){
      return;
    }
    setDelBrandID(e.target.id);
  }

  //alert is working, but favColors is not realtime
  const { favColors } = GetMyPaletteColor(myToken);
  const allColors = favColors?.map((color)=>(color.hexCode))
  const [chosenColor, setChosenColor] = useState("");
  const handleAddToMine = (pickedColor) =>{ 
    if(allColors.includes(pickedColor)){
      alert("The color you've selected has already been picked :D")
      return;
    }else{
      setChosenColor(pickedColor);
    }
  }
  useAddColorToMine(myToken, chosenColor)

  const [chosenDelColor, setChosenDelColor] = useState("");
  const handleRemoveFromMine = (picked) => {
    setChosenDelColor(picked)
  }
  console.log(chosenDelColor)
  useRemoveColorFromMine(myToken, chosenDelColor)

  //minimize palette
  const [showPalette, setShowPalette] = useState(true);
  const handleShowPalette = () =>{
    setShowPalette(!showPalette)
  }

  return(
    <>
    <StyledMenuToggle>
      <MainHeader/>
    </StyledMenuToggle> 
    <StyledMainContainer>
      <StyledWrapper>
        <h3># My Palette</h3>
    <PaletteContainer 
    picker={<ColorPicker  onChildData={handleAddToMine}/>} colorContainer="color-container" colors={showPalette? <ShowcaseChosenColors onKidsData={handleRemoveFromMine} array={favColors}/>: ""} paletteName="Create your Own">
      <PaletteBtn btnId="mode-change" btnClass="fa-solid fa-list" />
      <PaletteBtn btnId="edit-palette" btnClass="fa-solid fa-pen" />
    </PaletteContainer>
    {favBrands?.map((eachData)=>(
      <PaletteContainer key={eachData._id} paletteName={eachData.brand.name} colorContainer="color-container"
      colors={showPalette? <ShowcaseColors brand={eachData.brand}/>: ""}>
        <PaletteBtn btnId={eachData._id} btnClass="fa-solid fa-xmark" onClick={handleRemovePalette}/>
      <PaletteBtn btnId="tag-close" btnClass="fa-solid fa-minus" onClick={handleShowPalette}/>
      </PaletteContainer>
    ))}
      </StyledWrapper>
      
      <StyledWrapper>
    <h3># Brand Palette</h3>
    {brands?.map((brand)=>(<PaletteContainer key={brand.name} paletteName={brand.name} colorContainer="color-container" colors={<ShowcaseColors brand={brand}/>}> 
      <PaletteBtn btnId={brand._id} btnClass="fa-solid fa-heart" onClick={handleAddPalette}/>
      <PaletteBtn btnId="tag-close" btnClass="fa-solid fa-minus" onClick={handleShowPalette}/>
    </PaletteContainer>))}
</StyledWrapper>
</StyledMainContainer>
<SignupFooter bg="main-footer-bg" font="main-footer"/>
    </>
  )
}