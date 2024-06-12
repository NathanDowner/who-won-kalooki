import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

interface NavBtnWrapperProps extends PropsWithChildren {
  actionBtn: NavActionBtn;
}

export type NavActionBtn =
  | {
      label: string;
      type: 'button';
      icon: React.ComponentType<{ className?: string }>;
      noBorder?: boolean;
      onClick: () => void;
    }
  | {
      label: string;
      type: 'link';
      icon: React.ComponentType<{ className?: string }>;
      noBorder?: boolean;
      link: string;
    };

const NavButton = ({ actionBtn }: NavBtnWrapperProps) => {
  return (
    <>
      {actionBtn.type === 'link' ? (
        <Link
          to={actionBtn.link}
          className={clsx('btn rounded-md bg-white', {
            'border-2 border-black': !actionBtn.noBorder,
          })}
        >
          <actionBtn.icon className="h-6" />
        </Link>
      ) : (
        <button
          onClick={actionBtn.onClick}
          className={clsx('btn rounded-md bg-white', {
            'border-2 border-black': !actionBtn.noBorder,
          })}
        >
          <actionBtn.icon className="h-6" />
        </button>
      )}
    </>
  );
};

export default NavButton;
