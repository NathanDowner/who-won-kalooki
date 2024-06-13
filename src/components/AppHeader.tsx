import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import NavButton, { NavActionBtn } from './NavBtnWrapper';
import clsx from 'clsx';

interface AppHeaderProps {
  title?: string;
  autoHide?: boolean;
  showShadow?: boolean;
  leftActionBtn?: NavActionBtn;
  rightActionBtn?: NavActionBtn;
}

const AppHeader = ({
  title = '',
  autoHide = false,
  showShadow = false,
  leftActionBtn = {
    label: 'back button',
    icon: ArrowLeftIcon,
    type: 'button',
    onClick: () => {
      window.history.back();
    },
  },
  rightActionBtn,
}: AppHeaderProps) => {
  return (
    <header
      className={clsx(
        'min-h-16 bg-white z-50 sticky top-0 flex items-center -mx-4 p-4 mb-4',
        {
          'shadow-md': showShadow,
        },
      )}
    >
      <NavButton actionBtn={leftActionBtn} />
      <h1 className="ml-4 text-xl">{title}</h1>
      {/* right side */}
      <div className="flex items-center gap-2 ml-auto">
        {rightActionBtn && <NavButton actionBtn={rightActionBtn} />}
      </div>
    </header>
  );
};

export default AppHeader;
