import styled from "styled-components"

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
  position: relative; //new add for swiper
  h3 {
    color: #24201e;
  }
`

export {
  StyledMainContainer as MainContainer,
  StyledWrapper as MainWrapper
}