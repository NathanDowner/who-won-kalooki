import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
  type?: 'button' | 'submit';
  expanded?: boolean;
  btnStyle?: keyof typeof BUTTON_STYLES;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

const BUTTON_STYLES = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  error: 'btn-error',
};

const BUTTON_SIZES = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

const Button = ({
  children,
  loading = false,
  disabled = false,
  expanded = false,
  onClick,
  btnStyle = 'primary',
  size = 'md',
  type = 'button',
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        'btn border-2 border-black',
        BUTTON_STYLES[btnStyle],
        BUTTON_SIZES[size],
        expanded && 'w-full',
        className,
      )}
      disabled={disabled || loading}
    >
      {loading && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};

export default Button;
