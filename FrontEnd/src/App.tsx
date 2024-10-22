import { Route, Routes } from "react-router-dom"
import Home from "./screens/home"
import LandingPage from "./screens/home/LandingPage"


const App = () => {
  return (
    <div>
      <Routes>'<Route path="/" element={<LandingPage/>}></Route>'
        <Route path="/canvas" element={<Home/>}></Route>
      </Routes>
    </div>
  )
}

export default App