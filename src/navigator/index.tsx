import { Route, Routes, useNavigate } from "react-router-dom";
import Duel from "../Pages/Duel/Duel";
import Home from "../Pages/Home/Home";
import Simple from "../Pages/Simple/Simple";

export let navigateto: (path: string) => void;

function Navigator() {
  navigateto = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/simple" element={<Simple />} />
      <Route path="/duel" element={<Duel />} />
    </Routes>
  );
}

export default Navigator;
