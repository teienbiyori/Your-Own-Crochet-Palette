import { StyledMenuToggle, MainHeader, StyledMainContainer, StyledWrapper, PaletteContainer, PaletteBtn} from "./myPalette"
import { SignupFooter } from "./loginPage"
import { AddSelectionToMine, RemoveMyCollection, GetMyCollection, GetMyFavBrands, GetMyPaletteColor } from "../api/GetBrandPaletteData"
import { Snowfall } from "../assets/snowfall"
import { Honey } from "../assets/honey"
import { Autumn } from "../assets/autumn"
import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { useState, createContext, useEffect } from "react"
import { useContext } from "react"

const myToken = localStorage.getItem("token")

//squares inside my collection
const StyledPaletteSquare =styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 0.2rem;
  outline: 0.1rem solid rgba(36, 32, 30, 0.3);
  background-color:${props => props?.hexcode || "rgba(36, 32, 30, 0.2)"};
`
//Selectable squares in the crafthub page
const StyledColorSquare =styled.div`
  height: 1.5rem;
  width: 1.1rem;
  border-radius: 0.2rem;
  outline: 0.1rem solid rgba(36, 32, 30, 0.3);
  background-color:${props => props?.hexcode || "transparent"};
  ${props => props?.page &&`
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
    // only CraftHubPage has pickable styles
    const location = useLocation();
    const isCraftHub = location.pathname === "/crafthub";

    //add color to selector
    const {setSelectedColor, setColorSelection} = useContext(SelectionContext);
    const handleGetHex = (e) =>{
    const newColor = e.target.id;
    setSelectedColor(newColor);
    setColorSelection((prevSelection)=> {
      const updateSelection = [...prevSelection.slice(1), newColor];
      return updateSelection;
    })
  }
    const brandPalette = brand.paletteIds;
    return(<>
      {brandPalette?.map((color)=>(<StyledColorSquare id={color.hexCode} key={color.paletteId} hexcode={color.hexCode} page={isCraftHub} onClick={handleGetHex}/>))}
    </>)
}

function RenderChosenColors({array}){
  const location = useLocation();
  const isCraftHub = location.pathname === "/crafthub";
  const {setSelectedColor, setColorSelection} = useContext(SelectionContext);
  const handleGetHex = (e) =>{
    const newColor = e.target.id;
    setSelectedColor(newColor);
    setColorSelection((prevSelection)=> {
      const updateSelection = [...prevSelection.slice(1), newColor];
      return updateSelection;
    })

  }
    return(<>
      {array?.map((color)=>(<StyledColorSquare id={color.hexCode} key={color._id} hexcode={color.hexCode} page={isCraftHub} onClick={handleGetHex}/>))}
    </>)
}

function RenderChosenPalette({array}){
    return(<>
      {array?.map((color)=>(<StyledPaletteSquare id={color} key={color} hexcode={color}/>))}
    </>)
}

function CraftHubContainer({colorArray}){
  const SnowfallPattern = ({path})=>(<Snowfall path={path} first="#614d3b" second="#24201e" third="#cac8c6" fourth="#9f9089"/>)
  const HoneyPattern = ({path})=>(<Honey path={path} first="#614d3b" second="#24201e" third="#cac8c6" fourth="#9f9089"/>)
  const AutumnPattern = ({path})=>(<Autumn path={path} first="#614d3b" second="#24201e" third="#cac8c6" fourth="#9f9089"/>)
  const patternSlide = [ <SnowfallPattern key="snowfallPattern" path="path"/>, <HoneyPattern key="honeyPattern" path="path"/>, <AutumnPattern key="autumnPattern" path="path"/> ];
  const [slide, setSlide] = useState(patternSlide);
  // const EditPattern = [ <SnowfallPattern key="snowfallPatternLg" path="path-lg" first={colorArray[0]} second={colorArray[1]} third={colorArray[2]} fourth={colorArray[3]}/>, <HoneyPattern key="honeyPatternLg" path="path-lg" first={colorArray[0]} second={colorArray[1]} third={colorArray[2]} fourth={colorArray[3]}/>, <AutumnPattern key="autumnPatternLg" path="path-lg" first={colorArray[0]} second={colorArray[1]} third={colorArray[2]} fourth={colorArray[3]}/> ]
  // const [edit, setEdit] = useState(EditPattern);

  const handleSlideLeft =()=>{
    const updatedSlide = [...slide];
    setSlide((prevSlide)=> [...prevSlide.slice(1), updatedSlide[0]])
    // const editSlide = [...edit];
    // setEdit((prevSlide)=> [...prevSlide.slice(1), editSlide[0]])
  }

  const handleSlideRight =()=>{
    setSlide((prevSlide) => {
    const lastIndex = prevSlide.length - 1;
    const lastElement = prevSlide[lastIndex];
    const updatedSlide = [lastElement, ...prevSlide.slice(0, lastIndex)]; // Move last element to the beginning
    return updatedSlide;
  });
  //   setEdit((prevSlide) => {
  //   const lastIndex = prevSlide.length - 1;
  //   const lastElement = prevSlide[lastIndex];
  //   const currentSlide = [lastElement, ...prevSlide.slice(0, lastIndex)]; // Move last element to the beginning
  //   return currentSlide;
  // });
  }

  return(<>
  <div className="crafthub-container">
     <div className="path-slide-area">
    <button onClick={handleSlideLeft}>
      <i className="fa-solid fa-hand-point-left"></i>
    </button>
    {slide?.map((pattern)=>(pattern))}
    <button onClick={handleSlideRight}>
      <i className="fa-solid fa-hand-point-right"></i>
    </button>
  </div>
  <div className="path-area">
    {slide?.[1]}
    <Autumn
  path="path-lg"
  first={colorArray[0]}
  second={colorArray[1]}
  third={colorArray[2]}
  fourth={colorArray[3]}
/>
  </div>
  </div>
  </>)
}

function PaletteCollection({array, collectionId}){
  const {setColorSelection, delVersion} =useContext(SelectionContext);
  const [delId, setDelId] = useState("");
  const handleCollectionClicked = () =>{
    setColorSelection(array)
  }

  const handleRemoveCollection = ()=>{
    setDelId(collectionId)
  }
  RemoveMyCollection(myToken, delId);
  console.log(delId)

  return(<>
  <div className="path-palette" onClick={delVersion? handleRemoveCollection: handleCollectionClicked }>
    <RenderChosenPalette array={array}/>
  </div>
  </>)
}


function PaletteSelector(){
  const { colorSelection, setColorSelection} =useContext(SelectionContext);
  const [colorArray, setColorArray] = useState([]);

  const handleShuffle = ()=>{
    const shuffledSelection = [...colorSelection];
    for(let i=shuffledSelection.length-1; i>0; i--){
      const randomIndex = Math.floor(Math.random()*(i+1));
      [shuffledSelection[i], shuffledSelection[randomIndex]] = [shuffledSelection[randomIndex], shuffledSelection[i]];
    }
    setColorSelection(shuffledSelection);
  }

  const handleClear = () =>{
    setColorSelection(["#614d3b", "#24201e", "#cac8c6", "#9f9089"])
  }

  const handleAddCollection = () =>{
    const jsonSelection = JSON.stringify(colorSelection)
    setColorArray(jsonSelection)
  }
   AddSelectionToMine(myToken, colorArray)

  //aviod 
  useEffect(()=>{},[colorSelection])
 
  return(<>
  <div className="selection-area">
    <div className="selected">
      {colorSelection.map((color, index)=>(<SelectedColor key={`${color}-${index}`} color={color}/>))}
    </div>
    <div className="edit-icon">
      <button onClick={handleShuffle}><i className="fa-solid fa-shuffle"></i></button>
      <button onClick={handleAddCollection}><i className="fa-solid fa-download"></i></button>
      <button onClick={handleClear}><i className="fa-regular fa-trash-can"></i></button>
    </div>
  </div>
  </>)
}

//get all color data using useContext
const SelectionContext = createContext();

export default function CraftHubPage(){
  const { favBrands } = GetMyFavBrands(myToken);
  const { favColors } = GetMyPaletteColor(myToken);
  const { collections } = GetMyCollection(myToken);

  //color selected from palette
  const [selectedColor, setSelectedColor] =useState("");
  //selection render on pattern
  const [colorSelection, setColorSelection]= useState([
  "#614d3b", "#24201e", "#cac8c6", "#9f9089"]);
  const [delVersion, setDelVersion] = useState(false);

  return(
    <>
    <StyledMenuToggle>
      <MainHeader/>
    </StyledMenuToggle>

    <StyledMainContainer>
      <SelectionContext.Provider value={{ selectedColor, setSelectedColor, colorSelection, setColorSelection, delVersion }}>
      <StyledWrapper>
        <CraftHubContainer colorArray={colorSelection}/>
        <PaletteContainer
        paletteName={delVersion? "Remove Mode":"My Collection"}
        colorContainer="collection-container" 
        colors={collections?.map((collection)=>(<PaletteCollection key={collection._id} collectionId={collection._id} array={collection.colorSchema}/>))}>
      <PaletteBtn btnId="tag-close" btnClass="fa-regular fa-trash-can" onClick={()=>{setDelVersion(!delVersion)}}/>
      <PaletteBtn btnId="tag-delete" btnClass="fa-solid fa-minus" />
        </PaletteContainer>
      </StyledWrapper>

      <StyledWrapper>
        <PaletteSelector/>
        <PaletteContainer paletteName="My Palette" colorContainer="color-container" colors={<RenderChosenColors array={favColors}/>}>
          <PaletteBtn btnId="tag-close" btnClass="fa-solid fa-minus" />
        </PaletteContainer>
        {favBrands?.map((eachData)=>(
      <PaletteContainer key={eachData._id} paletteName={eachData.brand.name} colorContainer="color-container"
      colors={<RenderColors brand={eachData.brand}/>}>
      <PaletteBtn btnId="tag-close" btnClass="fa-solid fa-minus"/>
      </PaletteContainer>
    ))} 
      </StyledWrapper>
      </SelectionContext.Provider>
    </StyledMainContainer>
    <SignupFooter bg="main-footer-bg" font="main-footer"/>
    </>
  )
}