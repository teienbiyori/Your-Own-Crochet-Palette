import { MainHeader } from "../components/mainHeader";
import { Footer } from "../components/footer";
import { MainContainer, MainWrapper } from "../components/wrapper";
import { PaletteBtn, PaletteContainer } from "../components/paletteComponent";
import { ColorSquare } from "../components/colorSquare";
import { GetBrandPaletteData, GetMyFavBrands, AddBrandToMine, RemoveBrandFromMine, GetMyPaletteColor, useAddColorToMine, useRemoveColorFromMine } from "../api/GetBrandPaletteData"
import { useState } from "react"
import { ChromePicker } from "react-color"

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

function ShowcaseColors({brand}){
    const handleGetHex = (e) =>{
    console.log(e.target.id)
  }
    const brandPalette = brand.paletteIds;
    return(<>
      {brandPalette?.map((color)=>(<ColorSquare id={color.hexCode} key={color.paletteId} hexcode={color.hexCode} onClick={handleGetHex}/>))}
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
      {array?.map((color)=>(<ColorSquare id={color._id} key={color._id} hexcode={color.hexCode} onClick={handleGetHex}/>))}
    </>)
}


export default function PalettePage(){
  const { data } = GetBrandPaletteData();
  const brands = data;
  const { favBrands } = GetMyFavBrands();
  // const [myFavBrands, setMyFavBrands] = useState([]);
  const [brandID, setBrandID] = useState("");
  const [delBrandID, setDelBrandID] = useState("");
  AddBrandToMine(brandID);
  RemoveBrandFromMine(delBrandID)
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
  const { favColors } = GetMyPaletteColor();
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
  useAddColorToMine(chosenColor)

  const [chosenDelColor, setChosenDelColor] = useState("");
  const handleRemoveFromMine = (picked) => {
    setChosenDelColor(picked)
  }
  useRemoveColorFromMine(chosenDelColor)

  //minimize palette
  const [showPalette, setShowPalette] = useState(true);
  const handleShowPalette = () =>{
    setShowPalette(!showPalette)
  }

  return(
    <>
    <MainHeader />
    <MainContainer>
      <MainWrapper>
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
      </MainWrapper>
      
      <MainWrapper>
    <h3># Brand Palette</h3>
    {brands?.map((brand)=>(<PaletteContainer key={brand.name} paletteName={brand.name} colorContainer="color-container" colors={<ShowcaseColors brand={brand}/>}> 
      <PaletteBtn btnId={brand._id} btnClass="fa-solid fa-heart" onClick={handleAddPalette}/>
      <PaletteBtn btnId="tag-close" btnClass="fa-solid fa-minus" onClick={handleShowPalette}/>
    </PaletteContainer>))}
</MainWrapper>
</MainContainer>
<Footer bg="main-footer-bg" font="main-footer"/>
    </>
  )
}