import {BrowserRouter, Routes,Route} from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home"
function App() {


  return (
    <BrowserRouter>
    <Routes>
        {/* uselayout */}
        <Route path="/" element={<UserLayout/>}>
          <Route index element={<Home/>}></Route>
        </Route>
        {/* adminLayout */}
    </Routes>
    </BrowserRouter>
  )
}

export default App
