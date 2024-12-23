import Sidebar from '@/components/Sidebar';
import { BellIcon } from '@heroicons/react/24/outline';
import { Outlet } from 'react-router-dom';

const SidebarLayout = () => {
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
          <div className="!p-0  w-full navbar bg-none sticky top-0 z-50 flex-none">
            <div className="px-4 flex w-full justify-between items-center">
              <label
                htmlFor="side-menu"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost flex-none"
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

              <label
                htmlFor="notification-drawer"
                aria-label="open notification drawer"
                className="btn btn-square btn-ghost"
              >
                <BellIcon className="h-8" />
              </label>
            </div>
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

      {/* <div className="drawer drawer-end">
        <input
          type="checkbox"
          id="notification-drawer"
          className="drawer-toggle"
        />
        <div className="drawer-content h-screen flex flex-col bg-none"></div>
        <div className="drawer-side z-50">
          <label
            htmlFor="notification-drawer"
            aria-label="close notification drawer"
            className="drawer-overlay"
          ></label>
          <div className="menu px-4 w-80 max-w-[90%] min-h-full bg-white border-black border-l-4">
            <Sidebar onClose={handleSidebarClose} />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default SidebarLayout;
