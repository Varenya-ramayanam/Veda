import {BrowserRouter, Routes,Route} from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";

function App() {


  return (
    <BrowserRouter>
    <Routes>
        {/* uselayout */}
        <Route path="/" element={<UserLayout/>}/>
        {/* adminLayout */}
    </Routes>
    </BrowserRouter>
  )
}

export default App
