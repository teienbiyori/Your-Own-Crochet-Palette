//components
import { Menu } from "../components/menuComponent"
//tools
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

const StyledMenuToggle = styled.div`
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
    height: 3rem;
    border-radius: 50%;
    background-size: 100%;
    background-position: -0.15rem;
    background-image: url("https://cdn01.pinkoi.com/store/teienbiyori/logo/1/300x300.jpg");
  }
  h3 {
    color: #ece7e0;
    font-size: calc(0.4rem + 1vw);
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
    display: none;
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
`

export function MainHeader(){
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () =>{
    setShowMenu(!showMenu);
  }
  return(<>
    <StyledMenuToggle>
      <Link to="/user">
        <div className="header-img-container">
     </div>
      </Link>
     <h3>Craft Your Own Crochet Palette</h3>
     <a className="menu-toggle-icon" onClick={handleShowMenu}><i className="fa-solid fa-ellipsis-vertical"></i></a>
     <span style={{display:showMenu? "flex":"none"}}className="menu-toggle">
     <Menu />
     </span>
    </StyledMenuToggle>
  </>)
}