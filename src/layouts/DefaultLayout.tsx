import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <div className="relative flex-1 w-full">
      <Outlet />
      <div id="button-container"></div>
    </div>
  );
};

export default DefaultLayout;
