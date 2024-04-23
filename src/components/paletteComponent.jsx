import styled from "styled-components"

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
  StyledMainPalette as StyledMainPalette,
}

//tag btn on paletteContainer
export function PaletteBtn({ btnId, btnClass, onClick}){
  return(<>
    <button onClick={onClick}><i id={btnId} className={btnClass}></i></button>
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