import DemoPage from "../src/pages/demoPage"
import LoginPage from "../src/pages/loginPage"
import RegisterPage from "../src/pages/registerPage";
import UserPage from "../src/pages/userPage";
import PalettePage from "../src/pages/myPalette";
import CraftHubPage from "../src/pages/myCraftHub";
import GalleryPage from "../src/pages/myGallery";

import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <HashRouter>
    {/* <BrowserRouter basename="/Your-Own-Crochet-Palette"> seems like gh-page do not support BR*/}
      <Routes>
       <Route path="/" element={<DemoPage />}></Route>
       <Route path="login" element={<LoginPage />}></Route>
       <Route path="register" element={<RegisterPage />}></Route>
       <Route path="/user">
        <Route index element={<UserPage/>}/>
        <Route path="palette" element={<PalettePage />}></Route>
        <Route path="crafthub" element={<CraftHubPage />}></Route>
        <Route path="gallery" element={<GalleryPage />}></Route>  
       </Route>
      </Routes>
    {/* </BrowserRouter> */}
    </HashRouter>
    </>
  )
}

export default App
