import { Route, Routes, useLocation } from "react-router-dom";
import Detail from "./views/Detail/Detail";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import Form from "./views/Form/Form";
import NavBar from "./components/NavBar/NavBar";
import Error404 from "./utilities/Error404/Error404";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && !location.pathname.includes("/detail/") && (
        <NavBar />
      )}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Form />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
