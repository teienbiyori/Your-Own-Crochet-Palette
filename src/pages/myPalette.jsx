import { Footer } from "../components/footer";
import { GetBrandPaletteData, GetMyFavBrands, AddBrandToMine, RemoveBrandFromMine, GetMyPaletteColor, useAddColorToMine, useRemoveColorFromMine } from "../api/GetBrandPaletteData"
import { MainHeader } from "../components/mainHeader"
import { StyledColorSquare } from "./myCraftHub"
import styled from "styled-components"
import { useState } from "react"
import { ChromePicker } from "react-color"


const baseURL = "http://54.250.240.16:8080";

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
  StyledMainContainer as StyledMainContainer,
  StyledWrapper as StyledWrapper,
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
    <MainHeader />
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
<Footer bg="main-footer-bg" font="main-footer"/>
    </>
  )
}