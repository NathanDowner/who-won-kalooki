import React from 'react';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <div className="relative flex-1 overflow-y-auto w-full">
      <Outlet />
      <div id="button-container"></div>
    </div>
  );
};

export default DefaultLayout;
