import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <div className="p-4 max-w-5xl mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default DefaultLayout;
