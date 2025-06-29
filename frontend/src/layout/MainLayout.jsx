import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Outlet />  {/* renderiazr rutas hijas */}
      </main>
    </div>
  );
};

export default MainLayout;
