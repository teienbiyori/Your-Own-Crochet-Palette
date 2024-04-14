import DemoPage from "../src/pages/demoPage"
import LoginPage from "../src/pages/loginPage"
import RegisterPage from "../src/pages/registerPage";
import UserPage from "../src/pages/userPage";
import PalettePage from "../src/pages/myPalette";
import CraftHubPage from "../src/pages/myCraftHub";
import GalleryPage from "../src/pages/myGallery";

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
       <Route path="*" element={<DemoPage />}></Route>
       <Route path="login" element={<LoginPage />}></Route>
       <Route path="register" element={<RegisterPage />}></Route>
       <Route path="user" element={<UserPage />}></Route>
       <Route path="palette" element={<PalettePage />}></Route>
       <Route path="crafthub" element={<CraftHubPage />}></Route>
       <Route path="gallery" element={<GalleryPage />}></Route>    
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
