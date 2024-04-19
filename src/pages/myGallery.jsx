import { StyledMenuToggle, MainHeader, StyledMainContainer, StyledWrapper } from "./myPalette"
import { SignupFooter } from "./loginPage"
import { Snowfall } from "../assets/snowfall"
import { Honey } from "../assets/honey"
import { Autumn } from "../assets/autumn"
import { GetMyCollection } from "../api/GetBrandPaletteData"
import { RenderChosenPalette } from "../pages/myCraftHub"

const myToken = localStorage.getItem("token")

function EachPattern({children, palette}){
  return(
    <>
    <div className="each-pattern">
      {children}
      <div className="pattern-info">
        <div className="palette-info">
          <input className="palette-name" type="text" placeholder="palette-name" defaultValue="teienbiyori"/>
          <div className="fav-palette">{palette}</div>
        </div>
        <button><i className="fa-regular fa-paper-plane"></i></button>
      </div>
    </div>
    </>
  )
}

export default function GalleryPage(){
  const { collections } = GetMyCollection(myToken)
  console.log(collections?.[0].colorSchema)

  return(
    <>
    <StyledMenuToggle>
      <MainHeader/>
    </StyledMenuToggle>
     <StyledMainContainer>
      <StyledWrapper>
        <h3># TENENBIYORI</h3>
        feel free
      </StyledWrapper>
      <StyledWrapper>
        <h3># My Gallery</h3>
        <div className="pattern-gallery">
          {collections?.map((collection)=>(
          <EachPattern key={collection._id + ":snowfallArea"} 
          palette={<RenderChosenPalette array={collection.colorSchema}/>}>
            <Snowfall key={collection._id + ":snowfall"} path="pattern" first={collection.colorSchema[0]} second={collection.colorSchema[1]} third={collection.colorSchema[2]} fourth={collection.colorSchema[3]}/></EachPattern>))}
          {collections?.map((collection)=>(
          <EachPattern key={collection._id + ":honeyArea"}
          palette={<RenderChosenPalette array={collection.colorSchema}/>}>
            <Honey key={collection._id + ":honey"} path="pattern" first={collection.colorSchema[0]} second={collection.colorSchema[1]} third={collection.colorSchema[2]} fourth={collection.colorSchema[3]}/></EachPattern>))}
          {collections?.map((collection)=>(
          <EachPattern key={collection._id + ":autumnArea"}
          palette={<RenderChosenPalette array={collection.colorSchema}/>}>
            <Autumn key={collection._id + ":autumn"} path="pattern" first={collection.colorSchema[0]} second={collection.colorSchema[1]} third={collection.colorSchema[2]} fourth={collection.colorSchema[3]}/></EachPattern>))}
        </div>
      </StyledWrapper>
     </StyledMainContainer>
    <SignupFooter bg="main-footer-bg" font="main-footer"/>
    </>
  )
}