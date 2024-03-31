import styled from "styled-components";
import "../styles/craftPalette.scss"

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
  .loading-icon {
    width: 100%;
    display: flex;
    justify-content: center;
    .icon-container {
      margin: 0 0.5rem;
      .fa-palette {
      font-size: 2.5rem;
      margin: 0 auto;
      align-self: center;
      animation: popUp 1s ease;
      }
    }
  }
`

function PaletteIcon({hex, delay}){
  return(
    <>
    <div className="icon-container">
       <i className="fa-solid fa-palette" style={{color: hex, animationDelay: `${delay}s`}}></i>
    </div>
    </>
  )
}

export default function Loading(){
  const fourPalette = [
  { hex: "#24201E", delay: 0.1 },
  { hex: "#614D3B", delay: 0.3 },
  { hex: "#9F9089", delay: 0.5 },
  { hex: "#CAC8C6", delay: 0.7 }
];
  return(
    <>
      <LoadingContainer>
        <div className="loading-icon"> {
          fourPalette.map(item => (
           <PaletteIcon key={item.hex} hex={item.hex} delay={item.delay}/>
          ))
        }
        </div>
      </LoadingContainer>
    </>
  )
}
