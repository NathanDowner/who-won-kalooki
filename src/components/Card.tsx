import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  onClick?: () => void;
  className?: string;
}

const Card = ({ onClick, className, children }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'border-black border-4 rounded-md p-3 cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
