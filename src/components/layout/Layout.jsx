import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <h1>Mi Layout</h1>
      <Outlet />
    </>
  );
};

export default Layout;
