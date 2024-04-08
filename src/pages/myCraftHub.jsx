import { StyledMenuToggle, MainHeader, StyledMainContainer, StyledWrapper, PaletteContainer, StyledColorSquare} from "./myPalette"
import { SignupFooter } from "./loginPage"

import { GetBrandPaletteData } from "../api/paletteLibrary"
const baseURL = "http://34.125.232.84:8080";

  
export function RenderColors({brand}){
    return(<>
      {brand?.map((color)=>(<StyledColorSquare key={color?._id} hexCode={color?.hexCode} />))}
    </>)
}

export function RenderChosenColors({array}){
    return(<>
      {array?.map((color)=>(<StyledColorSquare key={color} hexCode={color} />))}
    </>)
}

export default function CraftHubPage(){
  const { data } = GetBrandPaletteData(`${baseURL}/palettes`);
  const firstBrand = data?.slice(0,30);
  const secondBrand = data?.slice(29,95);
  return(
    <>
    <StyledMenuToggle>
      <MainHeader/>
    </StyledMenuToggle>
    <StyledMainContainer>
      <StyledWrapper>
        <PaletteContainer>
        </PaletteContainer>
      </StyledWrapper>
      <StyledWrapper>
        <PaletteContainer colors={<RenderColors brand={firstBrand}/>}>
        </PaletteContainer>
        <PaletteContainer colors={<RenderColors brand={secondBrand}/>}>
        </PaletteContainer>
      </StyledWrapper>
    </StyledMainContainer>
    <SignupFooter bg="main-footer-bg" font="main-footer"/>
    </>
  )
}