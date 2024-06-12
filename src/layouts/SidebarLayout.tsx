import Sidebar from '@/components/Sidebar';
import { useTitle } from '@/contexts/TitleContext';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

const SidebarLayout = () => {
  const { title, showShadow } = useTitle();

  function handleSidebarClose() {
    const sidebar: HTMLInputElement | null =
      document.querySelector('.drawer-toggle');
    if (sidebar) {
      sidebar.checked = false;
    }
  }

  return (
    <>
      {/* <Header /> */}
      <div className="drawer">
        <input type="checkbox" id="side-menu" className="drawer-toggle" />
        <div className="drawer-content h-screen flex flex-col">
          {/* Navbar */}
          <div className="!p-0 -mx-2 w-full navbar bg-white sticky top-0 z-50 flex-none">
            <div className="flex-none pl-4">
              <label
                htmlFor="side-menu"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">{title}</div>
          </div>

          {/* Content */}
          <div>
            <Outlet />
            {/* Portal */}
          </div>
        </div>

        <div className="drawer-side z-50">
          <label
            htmlFor="side-menu"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu px-4 w-80 max-w-[90%] min-h-full bg-white border-black border-r-4">
            <Sidebar onClose={handleSidebarClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarLayout;
