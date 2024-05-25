import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import Logo from './Logo';

type SideBarLink = {
  label: string;
  link?: string;
  handler?: () => void;
};

const NAV_LINKS: SideBarLink[] = [
  {
    label: 'Profile',
    link: '/',
  },
  {
    label: 'Previous Games',
    link: '/previous-games',
  },
  {
    label: 'Give Feedback!',
    handler: () => {},
  },
];

const Sidebar = () => {
  const { logout, user } = useAuth();
  return (
    <>
      {/* Sidebar content here */}
      <div className="min-h-screen flex flex-col justify-between">
        <header>
          <div className="flex flex-col items-center mt-20">
            <div className="-mb-5 z-10 relative">
              <Logo className="h-24 absolute -top-[4.12rem] -left-1 -rotate-6" />
              <img
                src={user?.photoURL || ''}
                className="rounded-full h-[85px] border-4 border-black"
                alt="Displat picture"
              />
            </div>
            <div className="border-black border-4 p-2 text-center rounded-md pt-3 w-full">
              <h3 className="text-xl font-semibold tracking-widest">
                {user?.displayName}
              </h3>
              <h4>@user-name</h4>
            </div>
          </div>
        </header>

        <nav>
          <ul className="flex flex-col items-center text-xl">
            {NAV_LINKS.map((link) => (
              <>
                <li key={link.label} className="flex flex-col items-center">
                  {link.link ? (
                    <Link to={link.link}>{link.label}</Link>
                  ) : (
                    <button onClick={link.handler}>{link.label}</button>
                  )}
                </li>
                <hr className="w-8 border-2 rounded-full my-3 border-black  last:hidden" />
              </>
            ))}
          </ul>
        </nav>
        {/* <a className="text-xl">Welcome, {user?.displayName}!</a> */}
        <button onClick={logout} className="btn btn-primary mt-4">
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
