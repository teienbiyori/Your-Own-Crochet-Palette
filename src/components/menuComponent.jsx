import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

//for userPage & mainHeader
function MenuLink({route, text, icon, onClick}){
  const handleClick = () =>{
    if(onClick){
      onClick(); //call the passed in func if provided
    }
  }
  return(<>
    <a href={route} onClick={handleClick}>{text}<i className={icon}></i></a>
  </>)
}

export function Menu(){
  const navigate = useNavigate();
  const location = useLocation();
  const isUserPage = location.pathname === "/user";
  const handleLogout = () =>{
    localStorage.removeItem("token");
    Swal.fire({
      timer: 1000,
      title: "See you soon :D",
      width: 600,
      padding: "3em",
      color: "#24201e",
      background: "#ece7e0",
    });
    setTimeout(()=>navigate("/login",2000))
  }
  return(<>
    <MenuLink route={isUserPage? "user/palette" : "palette"} text="My Palette " icon="fa-solid fa-swatchbook" />
    <MenuLink route={isUserPage? "user/crafthub" : "crafthub"} text="My Craft Hub " icon="fa-solid fa-brush" />
    <MenuLink route={isUserPage? "user/gallery" : "gallery"} text="My Gallery " icon="fa-regular fa-image" />
    {isUserPage? "" : <MenuLink onClick={handleLogout} text="Log Out " icon="fa-solid fa-right-from-bracket" />}
  </>)
}