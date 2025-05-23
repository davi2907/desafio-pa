import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Script1 from "./pages/Script1";
import Script2 from "./pages/Script2";
import Script3 from "./pages/Script3";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/script1" element={<Script1 />} />
        <Route path="/script2" element={<Script2 />} />
        <Route path="/script3" element={<Script3 />} />
        <Route path="/busca" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
