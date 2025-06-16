import { BrowserRouter , Routes, Route } from "react-router-dom";
import {
  HomePage,
  BoosterPage,
  EquipoPage,
  FavoritosPage,
  MazoPage,
} from "./pages/index.jsx";
import Layout from "./components/layout/Layout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/booster" element={<BoosterPage />} />
          <Route path="/favoritos" element={<FavoritosPage />} />
          <Route path="/equipo" element={<EquipoPage />} />
          <Route path="/mazo" element={<MazoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
