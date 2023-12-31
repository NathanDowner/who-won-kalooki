import { useAuth } from '@/contexts/AuthContext';
import { useTitle } from '@/contexts/TitleContext';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  const { logout } = useAuth();
  const { title } = useTitle();

  return (
    <>
      {/* <Header /> */}
      <div className="drawer">
        <input type="checkbox" id="side-menu" className="drawer-toggle" />
        <div className="drawer-content h-screen flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar sticky top-0 shadow-md flex-none">
            <div className="flex-none lg:hidden">
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
          <div className="relative pb-4 flex-1 overflow-y-auto w-full">
            <div className="w-screen px-4">
              <Outlet />
            </div>
            <div id="button-container"></div>
          </div>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="side-menu"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <li>
              <a className="text-xl" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
