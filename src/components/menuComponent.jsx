import { useLocation } from "react-router-dom";

//for userPage & mainHeader
function MenuLink({route, text, icon}){
  return(<>
    <a href={route}>{text}<i className={icon}></i></a>
  </>)
}

export function Menu(){
  const location = useLocation();
  const isUserPage = location.pathname === "/user";
  return(<>
    <MenuLink route={isUserPage? "user/palette" : "palette"} text="My Palette " icon="fa-solid fa-swatchbook" />
    <MenuLink route={isUserPage? "user/crafthub" : "crafthub"} text="My Craft Hub " icon="fa-solid fa-brush" />
    <MenuLink route={isUserPage? "user/gallery" : "gallery"} text="My Gallery " icon="fa-regular fa-image" />
    {isUserPage? "" : <MenuLink text="Log Out " icon="fa-solid fa-right-from-bracket" />}
  </>)
}