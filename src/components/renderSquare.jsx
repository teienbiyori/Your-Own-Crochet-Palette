import { useState } from "react";
import { useLocation } from "react-router-dom"; 

export function ShowcaseColors({brand}){
    const handleGetHex = (e) =>{
    console.log(e.target.id)
  }
    const brandPalette = brand.paletteIds;
    return(<>
      {brandPalette?.map((color)=>(<StyledColorSquare id={color.hexCode} key={color.paletteId} hexcode={color.hexCode} onClick={handleGetHex}/>))}
    </>)
}

export function ShowcaseChosenColors({array, onKidsData}){
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

export function RenderChosenColors({array}){
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