import styled from "styled-components";

//Selectable squares in crafthub page
const StyledColorSquare =styled.div`
  height: 2rem;
  width: 1.5rem;
  border-radius: 0.2rem;
  outline: 0.15rem solid rgba(202, 200, 198, 0.5);
  background-color:${props => props?.hexcode || "transparent"};
  ${props => props?.page &&`
    cursor: pointer;
    &:hover {
      outline: 0.15rem solid #cac8c6;
    }
    &:active {
      transform: translateY(-0.2rem);
    }
  `
  }
`

//Selectable squares in create my own section 
const StyledMyOwnSquare =styled.div`
  height: 2rem;
  width: 1.5rem;
  border-radius: 0.2rem;
  outline: 0.15rem solid rgba(202, 200, 198, 0.5);
  background-color:${props => props?.hexcode || "transparent"};
  cursor: pointer;
  &:hover {
    outline: 0.15rem solid rgba(36, 32, 30, 0.3);
  }
  &:active {
    outline: 0.15rem solid rgba(36, 32, 30, 0.8);
  }
  ${
    props => props?.picked &&`
    outline: 0.15rem solid rgba(36, 32, 30, 0.5);
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
//squares inside my collection
const StyledPaletteSquare =styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 0.2rem;
  outline: 0.1rem solid rgba(36, 32, 30, 0.3);
  background-color:${props => props?.hexcode || "rgba(36, 32, 30, 0.2)"};
`


export {
  StyledMyOwnSquare as MyOwnSquare,
  StyledColorSquare as ColorSquare,
  SelectedColor as SelectorSquare,
  StyledPaletteSquare as PaletteSquare
}