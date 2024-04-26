import { MainHeader } from "../components/mainHeader";
import { Footer } from "../components/footer";
import { MainContainer, MainWrapper } from "../components/wrapper";
import { PaletteBtn, PaletteContainer } from "../components/paletteComponent";
import { ColorSquare, MyOwnSquare } from "../components/colorSquare";
import { GetBrandPaletteData, GetMyFavBrands, AddBrandToMine, RemoveBrandFromMine, GetMyPaletteColor, useAddColorToMine, useRemoveColorFromMine } from "../api/GetBrandPaletteData"
import { useEffect, useState } from "react"
import { ChromePicker } from "react-color"
// import { useContext, createContext } from "react"

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
    const brandPalette = brand.paletteIds;
    return(<>
      {brandPalette?.map((color)=>(<ColorSquare id={color.hexCode} key={color.paletteId} hexcode={color.hexCode} />))}
    </>)
}

function ShowcaseChosenColors({array, onKidsData}){
  const [picked, setPicked] = useState("");
  const [isActive, setIsActive] = useState("")
  const handleGetHex = (e) =>{
    setPicked(e.target.id);
    setIsActive(e.target.id);
  }
  const handleDelHex = ()=>{
    if(picked===""){
      return;
    }
    onKidsData(picked)
  }
    return(<>
      <button className="delete-color" onClick={handleDelHex}><i className="fa-regular fa-trash-can"></i></button>
      {array?.map((color)=>(<MyOwnSquare id={color._id} key={color._id} hexcode={color.hexCode} onClick={handleGetHex} picked={isActive === color._id}/> ))}
    </>)
}


export default function PalettePage(){
  const { data } = GetBrandPaletteData();
  const brands = data;
  const { favBrands } = GetMyFavBrands();
  const [brandID, setBrandID] = useState("");
  const [delBrandID, setDelBrandID] = useState("");
  AddBrandToMine(brandID);
  RemoveBrandFromMine(delBrandID);
 
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
  const [showPalette, setShowPalette] = useState([]);
  const handleShowPalette = (e) =>{
    const minmaxPalette = e.target.id;
      if(minmaxPalette.length === 0){
        return;
      }
      if (showPalette.includes(minmaxPalette)) {
        setShowPalette((prev) => prev.filter((id) => id !== minmaxPalette));
      } else {
        setShowPalette((prev) => [...prev, minmaxPalette]);
      }
  }
  return(
    <>
    <MainHeader />
    <MainContainer>
      <MainWrapper>
        <h3># My Palette</h3>
    <PaletteContainer 
    picker={<ColorPicker  onChildData={handleAddToMine}/>} colorContainer="color-container" colors={ <ShowcaseChosenColors onKidsData={handleRemoveFromMine} array={favColors}/>} paletteName="Create your Own">
      <PaletteBtn btnId="edit-palette" btnClass="fa-solid fa-pen" />
    </PaletteContainer>
    {favBrands?.map((eachData)=>(
      <PaletteContainer key={eachData._id} paletteName={eachData.brand.name} colorContainer="color-container"
      colors={showPalette.includes(eachData._id)? "": <ShowcaseColors brand={eachData.brand}/> }>
      <PaletteBtn btnId={eachData._id} btnClass="fa-solid fa-xmark" onClick={handleRemovePalette}/>
      <PaletteBtn btnId={eachData._id} btnClass="fa-solid fa-minus" onClick={handleShowPalette}/>
      </PaletteContainer>
    ))}
      </MainWrapper>
      
      <MainWrapper>
    <h3># Brand Palette</h3>
    {brands?.map((brand)=>(<PaletteContainer key={brand.name} paletteName={brand.name} colorContainer="color-container" colors={showPalette.includes(brand._id)? "": <ShowcaseColors brand={brand}/>}> 
      <PaletteBtn btnId={brand._id} btnClass="fa-solid fa-heart" onClick={handleAddPalette}/>
      <PaletteBtn btnId={brand._id} btnClass="fa-solid fa-minus" onClick={handleShowPalette}/>
    </PaletteContainer>))}
</MainWrapper>
</MainContainer>
<Footer bg="main-footer-bg" font="main-footer"/>
    </>
  )
}