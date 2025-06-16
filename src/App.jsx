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
<<<<<<< Updated upstream
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
=======
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
>>>>>>> Stashed changes
}

export default App;
