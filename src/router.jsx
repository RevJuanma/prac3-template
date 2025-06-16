import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Home, Booster, Favoritos, Team} from "./pages"
import Header from './layouts/Header/Header'
const AppRouter = () => {
  return (
    <BrowserRouter>
        <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booster" element={<Booster />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/equipo" element={<Team />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
