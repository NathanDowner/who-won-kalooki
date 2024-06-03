import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

type SideBarLink = {
  label: string;
  link?: string;
  handler?: () => void;
  requiresAuth: boolean;
};

const NAV_LINKS: SideBarLink[] = [
  {
    label: 'Home',
    link: '/',
    requiresAuth: true,
  },
  // {
  //   label: 'Profile',
  //   link: '/profile',
  //   requiresAuth: true,
  // },
  {
    label: 'Previous Games',
    link: '/previous-games',
    requiresAuth: true,
  },
  // {
  //   label: 'Give Feedback!',
  //   handler: () => {},
  //   requiresAuth: false,
  // },
];

type SideBarProps = {
  onClose: () => void;
};

const Sidebar = ({ onClose }: SideBarProps) => {
  const { logout, user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  function handleItemClick(link: SideBarLink | (() => void)) {
    onClose();
    if (typeof link === 'function') return link();
    if (link.link) return navigate(link.link);
    if (link.handler) return link.handler();
  }

  function getVisibleLinks(link: SideBarLink): boolean {
    if (link.requiresAuth && !user) return false;
    return true;
  }

  return (
    <>
      {/* Sidebar content here */}
      <div className="h-screen p-4 flex flex-col justify-between">
        <header>
          {user ? (
            <div className="flex flex-col items-center mt-20">
              <div className="-mb-5 z-10 relative">
                <Logo className="h-24 absolute -top-[4.12rem] -left-1 -rotate-6" />
                <img
                  src={user?.photoURL || ''}
                  className="rounded-full h-[85px] w-[85px] border-4 border-black bg-white"
                  alt="Display picture"
                />
              </div>
              <div className="border-black border-4 p-2 text-center rounded-md pt-3 w-full">
                <h3 className="text-xl font-semibold tracking-widest">
                  {user?.displayName}
                </h3>
                <h4>@user-name</h4>
              </div>
            </div>
          ) : (
            <div>
              <Logo className="h-52 mx-auto" withText />
            </div>
          )}
        </header>

        <nav>
          <ul className="flex flex-col items-center text-xl">
            {NAV_LINKS.filter(getVisibleLinks).map((link) => (
              <>
                <li key={link.label} className="flex flex-col items-center">
                  <button onClick={() => handleItemClick(link)}>
                    {link.label}
                  </button>
                </li>
                <hr className="w-8 border-2 rounded-full my-3 border-black  last:hidden" />
              </>
            ))}
          </ul>
        </nav>

        {user ? (
          <button
            onClick={() => handleItemClick(logout)}
            className="btn btn-primary"
          >
            Log out
          </button>
        ) : (
          <button
            onClick={() => handleItemClick(signInWithGoogle)}
            className="btn btn-primary"
          >
            Log in
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;
