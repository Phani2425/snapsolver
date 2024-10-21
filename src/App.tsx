import { Route, Routes } from "react-router-dom"
import Home from "./screens/home"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </div>
  )
}

export default App