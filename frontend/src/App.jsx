import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Team from './pages/Team';
import Favorite from './pages/Favorite';
import BoosterPack from './pages/BoosterPack';
import MainLayout from './layout/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import SelectPokemon from './pages/SelectPokemon';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/team" element={<Team />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/booster-pack" element={<BoosterPack />} />
            <Route path="/select-pokemon" element={<SelectPokemon />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </Router>
  );
};

export default App;