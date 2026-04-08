import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./main/Home.jsx";
import Feature01 from "./pages/f01/f01.jsx";
import Feature02 from "./pages/f02/f02.jsx";
import Feature03 from "./pages/f03/f03.jsx";
import Feature04 from "./pages/f04/f04.jsx";
import Feature05 from "./pages/f05/f05.jsx";
import Feature06 from "./pages/f06/f06.jsx";
import Feature07 from "./pages/f07/f07.jsx";
import Feature08 from "./pages/f08/f08.jsx";
import Feature09 from "./pages/f09/f09.jsx";
import Feature10 from "./pages/f10/f10.jsx";
import Feature11 from "./pages/f11/f11.jsx";
import Feature12 from "./pages/f12/f12.jsx";
import Feature13 from "./pages/f13/f13.jsx";
import Feature14 from "./pages/f14/f14.jsx";
import Feature15 from "./pages/f15/f15.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feature01" element={<Feature01 />} />
        <Route path="/feature02" element={<Feature02 />} />
        <Route path="/feature03" element={<Feature03 />} />
        <Route path="/feature04" element={<Feature04 />} />
        <Route path="/feature05" element={<Feature05 />} />
        <Route path="/feature06" element={<Feature06 />} />
        <Route path="/feature07" element={<Feature07 />} />
        <Route path="/feature08" element={<Feature08 />} />
        <Route path="/feature09" element={<Feature09 />} />
        <Route path="/feature10" element={<Feature10 />} />
        <Route path="/feature11" element={<Feature11 />} />
        <Route path="/feature12" element={<Feature12 />} />
        <Route path="/feature13" element={<Feature13 />} />
        <Route path="/feature14" element={<Feature14 />} />
        <Route path="/feature15" element={<Feature15 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;