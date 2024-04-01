import { Menu } from "./userPage"
import { SignupFooter } from "./loginPage"
import styled from "styled-components"
import "../styles/craftPalette.scss"

const StyledMenuToggle = styled.div`
header {
  z-index: 999;
  background-color: #24201e;
  height: 3rem;
  width: 100%;
  position: fixed;
  display: flex;
  padding: 0 1rem;
  .header-img-container {
    position: absolute;
    top: 3rem;
    transform: translateY(-65%);
    width: 3rem;
  }
  .header-img {
    border-radius: 50%;
  }
  h3 {
    color: #ece7e0;
    font-size: 0.8rem;
    position: absolute;
    top: 3rem;
    left: 4.2rem;
    transform: translateY(-100%);
  }
  .menu-toggle-icon {
    align-self: center;
    position: absolute;
    right: 1rem;
    padding: 0 1rem;
    color: #ece7e0;
    cursor: pointer;
  }
  .menu-toggle {
    display: flex;
    position: absolute;
    top: 3rem;
    right: 0;
    padding-left: 0.5rem;
    background-color: #24201e;
    flex-direction: column;
    align-items: end;
    a {
        border-radius: 1rem 0 0 1rem;
        color: #ece7e0;
        padding: 0.5rem 1rem 0.5rem 1.5rem;
        margin: 0 0 0.3rem;
        font-size: 0.8rem;
        &:hover {
          background-color: #9f9089;
          color: #ece7e0;
        }
        &:active {
          background-color: rgba(159, 144, 137, 0.5);
        }
      }
  }
}
`
export {
  StyledMenuToggle as StyledMenuToggle,
}

export function MainHeader(){
  return(<>
    <header>
     <div className="header-img-container">
      <img className="header-img" src="https://cdn01.pinkoi.com/store/teienbiyori/logo/1/300x300.jpg" alt=""/>
     </div>
     <h3>Craft Your Own Crochet Palette</h3>
     <a className="menu-toggle-icon"><i className="fa-solid fa-ellipsis-vertical"></i></a>
     <span className="menu-toggle">
      < Menu/>
     </span>
</header>
  </>)
}

export default function PalettePage(){
  return(
    <>
    <StyledMenuToggle>
      <MainHeader/>
    </StyledMenuToggle> 
<main className="main-container">
  <div className="left-wrapper">
    <h2># My Palette</h2>
    <div className="palette-container">
      <div className="btn-container">
        <button className="show-all">c</button>
        <button className="show-each">z</button>
        <button className="add-palette">+</button>
      </div>
      <div className="name-container">
        <h3 className="palette-name">Main Shop</h3>
      </div>
      <div id="my-palette" className="color-container d-flex">
      </div>
    </div>
    <div className="palette-container">
      <div className="btn-container">
        <button className="show-all">c</button>
        <button className="show-each">z</button>
        <button className="add-palette">+</button>
      </div>
      <div className="name-container">
        <h3 className="palette-name">Main Shop</h3>
      </div>
      <div id="second-palette" className="color-container d-flex">
      </div>
    </div>
  </div>
  <div className="right-wrapper">
    <h2># Brand Palette</h2>
    <div className="palette-container">
      <div className="btn-container">
        <button className="show-all">c</button>
        <button className="show-each">z</button>
        <button className="add-palette">+</button>
      </div>
      <div className="name-container">
        <h3 className="palette-name">Main Shop</h3>
      </div>
      <div id="shop-palette" className="color-container d-flex">
      </div>
    </div>
  </div>
</main>
<SignupFooter bg="main-footer-bg" font="main-footer"/>
    </>
  )
}