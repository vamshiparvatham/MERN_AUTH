import { BrowserRouter,Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { About } from "./pages/About";

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/about" element = {<About/>}/>
        <Route path = "/profile" element = {<Profile/>}/>
        <Route path = "/sigin" element = {<Signin/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
      </Routes>
    
    </BrowserRouter>
  )
  
}
