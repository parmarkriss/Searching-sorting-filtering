import { BrowserRouter, Route, Routes } from "react-router-dom"
import Add from "./Components/Add"
import View from "./Components/View"
import Edit from "./Components/Edit"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Add />}></Route>
        <Route path="/view" element={<View />}></Route>
        <Route path="/editdata/:userid" element={<Edit />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
